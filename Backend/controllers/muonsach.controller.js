const TheoDoiMuon = require('../models/THEODOIMUONSACH');
const Sach = require('../models/SACH');

// Mượn sách
exports.borrow = async (req, res) => {
  try {
    const MaDocGia = req.user.id;
    const { MaSach, NgayTra } = req.body;

    if (!MaSach || !NgayTra) 
      return res.status(400).json({ message: "Thiếu dữ liệu mượn sách hoặc ngày trả." });

    const ngayTraDate = new Date(NgayTra);
    const ngayMuonDate = new Date(); // mặc định ngày mượn là hôm nay

    if (ngayTraDate <= ngayMuonDate) 
      return res.status(400).json({ message: "Ngày trả phải sau ngày mượn." });

    const book = await Sach.findById(MaSach);
    if (!book) return res.status(404).json({ message: "Không tìm thấy sách." });
    if (book.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết." });

    // Tạo record mượn
    const newMuon = new TheoDoiMuon({ MaDocGia, MaSach, NgayMuon: ngayMuonDate, NgayTra: ngayTraDate });
    await newMuon.save();

    // Giảm số lượng sách
    book.SoQuyen -= 1;
    await book.save();

    res.json({ message: "Mượn sách thành công!", data: newMuon });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi mượn sách." });
  }
};

// Trả sách
exports.returnBook = async (req, res) => {
  try {
    const { muonId } = req.body; // id record trong THEODOIMUONSACH

    const record = await TheoDoiMuon.findById(muonId);
    if (!record) return res.status(404).json({ message: "Không tìm thấy phiếu mượn." });
    if (record.NgayTra && record.NgayTra < new Date()) return res.status(400).json({ message: "Sách đã trả." });

    const book = await Sach.findById(record.MaSach);
    if (!book) return res.status(404).json({ message: "Không tìm thấy sách." });

    // Cập nhật ngày trả thực tế (hôm nay)
    record.NgayTra = new Date();
    await record.save();

    // Tăng số lượng sách lên
    book.SoQuyen += 1;
    await book.save();

    res.json({ message: "Trả sách thành công!", data: record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi trả sách." });
  }
};
