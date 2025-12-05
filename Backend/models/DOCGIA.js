const mongoose = require("mongoose");

const DocGiaSchema = new mongoose.Schema({
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
  Email: { type: String, unique: true },
  Password: String,

  // ===== TRẠNG THÁI TÀI KHOẢN =====
  TrangThai: {
    type: String,
    enum: ["Hoạt động", "Bị khóa"],
    default: "Hoạt động"
  }
}, {
  collection: "DOCGIA"
});

module.exports = mongoose.model("DOCGIA", DocGiaSchema);
