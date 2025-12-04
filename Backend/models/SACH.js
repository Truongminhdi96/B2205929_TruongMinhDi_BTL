const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema({
  MaSach: String,
  TenSach: String,
  DonGia: Number,
  SoQuyen: Number,
  NamXuatBan: Number,
  MaNXB: String,
  TacGia: String
}, { collection: "SACH" });

module.exports = mongoose.model("SACH", SachSchema);
