const mongoose = require("mongoose");

const DocGiaSchema = new mongoose.Schema({
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String,
  Email: { type: String, unique: true },
  Password: String
}, {
  collection: "DOCGIA"  // BẮT BUỘC
});

// BẮT BUỘC: Đặt modelName = tên bảng luôn
module.exports = mongoose.model("DOCGIA", DocGiaSchema);
