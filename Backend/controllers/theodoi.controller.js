const TheoDoiMuon = require("../models/THEODOIMUONSACH");
const Sach = require("../models/SACH");

exports.getAll = async (req, res) => {
  try {
    const data = await TheoDoiMuon.find()
      .populate("MaDocGia", "name Email")
      .populate("MaSach", "TenSach TacGia")
      .sort({ NgayMuon: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Admin duyệt mượn
exports.approveBorrow = async (req, res) => {
  try {
    const muon = await TheoDoiMuon.findById(req.params.id);
    if (!muon) return res.status(404).json({ message: "Không tìm thấy đơn mượn" });

    if (muon.TrangThai !== "Đang xét duyệt")
      return res.status(400).json({ message: "Đơn đã được xử lý" });

    const book = await Sach.findById(muon.MaSach);
    if (!book) return res.status(404).json({ message: "Không tìm thấy sách" });
    if (book.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết" });

    // Giảm số lượng
    book.SoQuyen -= 1;
    await book.save();

    muon.TrangThai = "Đã mượn";
    await muon.save();

    res.json({ message: "Duyệt mượn thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xác nhận trả sách
exports.returnBook = async (req, res) => {
  try {
    const muon = await TheoDoiMuon.findById(req.params.id);
    if (!muon) return res.status(404).json({ message: "Không tìm thấy đơn mượn" });

    if (muon.TrangThai === "Đã trả")
      return res.status(400).json({ message: "Đơn đã trả" });

    // Cập nhật ngày trả thực tế
    muon.TrangThai = "Đã trả";
    muon.NgayTraThucTe = new Date();
    await muon.save();

    // Tăng số lượng sách
    const book = await Sach.findById(muon.MaSach);
    if (book) {
      book.SoQuyen += 1;
      await book.save();
    }

    res.json({ message: "Trả sách thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thống kê số lượt mượn theo thời gian
exports.getStats = async (req, res) => {
  try {
    const stats = await TheoDoiMuon.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$NgayMuon" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi thống kê" });
  }
};
// Lấy lịch sử mượn theo User
exports.getByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await TheoDoiMuon.find({ MaDocGia: id })
      .populate("MaSach", "TenSach TacGia")
      .sort({ NgayMuon: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy lịch sử", err });
  }
};
exports.countBorrow = async (req, res) => {
  try {
    const count = await TheoDoiMuon.countDocuments({
      MaDocGia: req.params.id,
      TrangThai: "Đã mượn"
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đếm số sách đang mượn" });
  }
};

