const TheoDoiMuon = require('../models/THEODOIMUONSACH');
const Sach = require('../models/SACH');

exports.borrow = async (req, res) => {
  try {
    const MaDocGia = req.user.id; // user đã login
    const { MaSach, NgayTra } = req.body;

    if (!MaSach || !NgayTra) {
      return res.status(400).json({ message: "Thiếu dữ liệu mượn sách hoặc ngày trả." });
    }

    const book = await Sach.findById(MaSach);
    if (!book) return res.status(404).json({ message: "Không tìm thấy sách." });
    if (book.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết." });

    const ngayTraDate = new Date(NgayTra);
    const ngayMuonDate = new Date();

    if (ngayTraDate <= ngayMuonDate) {
      return res.status(400).json({ message: "Ngày trả phải sau ngày mượn." });
    }

    // Tạo record mượn với trạng thái "Đang xét duyệt"
    const newMuon = new TheoDoiMuon({
      MaDocGia,
      MaSach,
      NgayTra: ngayTraDate,
      TrangThai: "Đang xét duyệt"
    });

    await newMuon.save();

    res.json({ message: "Tạo đơn mượn thành công, đang chờ xét duyệt.", data: newMuon });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi mượn sách." });
  }
};

// Xác nhận mượn (admin hoặc hệ thống)
exports.confirmBorrow = async (req, res) => {
  try {
    const { id } = req.params; // id của record mượn
    const muon = await TheoDoiMuon.findById(id);
    if (!muon) return res.status(404).json({ message: "Không tìm thấy đơn mượn." });

    if (muon.TrangThai !== "Đang xét duyệt") {
      return res.status(400).json({ message: "Đơn mượn đã được xử lý." });
    }

    // Giảm số lượng sách
    const book = await Sach.findById(muon.MaSach);
    if (!book) return res.status(404).json({ message: "Không tìm thấy sách." });
    if (book.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết." });

    book.SoQuyen -= 1;
    await book.save();

    muon.TrangThai = "Đã mượn";
    await muon.save();

    res.json({ message: "Xác nhận mượn thành công.", data: muon });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi xác nhận mượn." });
  }
};

// Trả sách
exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params; // id của record mượn
    const muon = await TheoDoiMuon.findById(id);
    if (!muon) return res.status(404).json({ message: "Không tìm thấy đơn mượn." });

    if (muon.TrangThai === "Đã trả") {
      return res.status(400).json({ message: "Sách đã được trả." });
    }

    // Cập nhật ngày trả thực tế và trạng thái
    muon.NgayTraThucTe = new Date();
    muon.TrangThai = "Đã trả";
    await muon.save();

    // Tăng số lượng sách
    const book = await Sach.findById(muon.MaSach);
    if (book) {
      book.SoQuyen += 1;
      await book.save();
    }

    res.json({ message: "Trả sách thành công.", data: muon });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi trả sách." });
  }
};

// Lấy lịch sử mượn của user
exports.userBorrowHistory = async (req, res) => {
  try {
    const MaDocGia = req.user.id;
    const data = await TheoDoiMuon.find({ MaDocGia })
      .populate("MaSach", "TenSach TacGia")
      .sort({ NgayMuon: -1 });

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi lấy lịch sử mượn." });
  }
};
