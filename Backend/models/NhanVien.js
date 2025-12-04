const mongoose = require("mongoose");
const NhanVienSchema = new mongoose.Schema({
  MSNV: { type: String, required: true, unique: true },
  HoTenNV: { type: String, required: true },
  Password: { type: String, required: true },
  Chucvu: { type: String, required: true },
  Diachi: { type: String, required: true },
  SoDienThoai: { type: String, required: true }
}, { collection: 'NhanVien' });  // ✅ thêm collection chính xác

module.exports = mongoose.model("NhanVien", NhanVienSchema);
