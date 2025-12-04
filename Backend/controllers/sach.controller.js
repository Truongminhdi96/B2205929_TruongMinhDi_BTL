const Sach = require('../models/SACH');

// Tạo sách mới
exports.create = async (req, res) => {
  try {
    const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = req.body;

    if (!TenSach || !DonGia || !SoQuyen) {
      return res.status(400).json({ message: 'Tên sách, đơn giá và số quyển là bắt buộc.' });
    }

    const s = new Sach({ TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia });
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    console.error('Lỗi khi tạo sách:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo sách.' });
  }
};

// Lấy danh sách sách
exports.list = async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? { TenSach: { $regex: q, $options: "i" } } : {};

    const data = await Sach.find(filter)
      .populate("MaNXB", "TenNXB") // populate chỉ lấy tên NXB
      .sort({ TenSach: 1 });

    res.json(data);
  } catch (err) {
    console.error("Lỗi fetch sách:", err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 sách theo ID
exports.get = async (req, res) => {
  try {
    const s = await Sach.findById(req.params.id)
      .populate("MaNXB");  // chỉ chạy nếu MaNXB là ObjectId
    if (!s) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(s);
  } catch (err) {
    console.error('Lỗi fetch sách theo ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật sách
exports.update = async (req, res) => {
  try {
    const s = await Sach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!s) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(s);
  } catch (err) {
    console.error('Lỗi update sách:', err);
    res.status(500).json({ message: 'Lỗi server khi cập nhật sách.' });
  }
};

// Xóa sách
exports.remove = async (req, res) => {
  try {
    const s = await Sach.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json({ message: 'Xóa sách thành công' });
  } catch (err) {
    console.error('Lỗi xóa sách:', err);
    res.status(500).json({ message: 'Lỗi server khi xóa sách.' });
  }
};
