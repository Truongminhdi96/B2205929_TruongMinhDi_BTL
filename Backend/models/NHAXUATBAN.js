const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema({
  MaNXB: String,     // mã hiển thị (tùy bạn)
  TenNXB: String,
  DiaChi: String
}, { collection: "NHAXUATBAN" });

module.exports = mongoose.model("NHAXUATBAN", NhaXuatBanSchema);
