const TheoDoiMuon = require("../models/THEODOIMUONSACH");
const Sach = require("../models/SACH");

// Lấy lịch sử mượn của user
exports.getUserBorrows = async (req, res) => {
  try {
    const userId = req.params.id;

    // Chỉ user đăng nhập mới xem được
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Không có quyền xem lịch sử này" });
    }

    const borrows = await TheoDoiMuon.find({ MaDocGia: userId })
      .populate("MaSach"); // lấy thông tin sách

    res.json(borrows);
  } catch (err) {
    console.error("Lỗi getUserBorrows:", err);
    res.status(500).json({ message: "Lỗi server khi lấy lịch sử mượn" });
  }
};

// Trả sách
exports.returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;

    const borrow = await TheoDoiMuon.findById(borrowId).populate("MaSach");
    if (!borrow) return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });

    if (borrow.NgayTra) return res.status(400).json({ message: "Sách đã trả rồi" });

    // Chỉ độc giả đó mới trả sách
    if (req.user.id !== String(borrow.MaDocGia)) {
      return res.status(403).json({ message: "Không có quyền trả sách này" });
    }

    borrow.NgayTra = new Date();
    await borrow.save();

    // Tăng số lượng sách
    const book = borrow.MaSach;
    book.SoQuyen += 1;
    await book.save();

    res.json({ message: "Trả sách thành công!" });
  } catch (err) {
    console.error("Lỗi returnBook:", err);
    res.status(500).json({ message: "Lỗi server khi trả sách" });
  }
};
