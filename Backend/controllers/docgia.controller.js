const DocGia = require('../models/DOCGIA');
const bcrypt = require('bcryptjs');

exports.list = async (req, res) => {
  try {
    const data = await DocGia.find().select('-Password');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const d = await DocGia.findById(req.params.id).select('-Password');
    res.json(d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const body = req.body;
    if (body.Password)
      body.Password = await bcrypt.hash(body.Password, 10);

    const d = await DocGia.findByIdAndUpdate(req.params.id, body, {
      new: true
    }).select('-Password');

    res.json(d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await DocGia.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔥 CẬP NHẬT TRẠNG THÁI (KHÓA / MỞ) */
exports.updateTrangThai = async (req, res) => {
  try {
    const dg = await DocGia.findByIdAndUpdate(
      req.params.id,
      { BiKhoa: req.body.BiKhoa }, // boolean : true / false
      { new: true }
    );

    res.json(dg);
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái" });
  }
};
