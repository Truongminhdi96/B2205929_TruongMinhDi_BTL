const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema({
  MaNXB: String,
  TenNXB: String,
  DiaChi: String
}, { collection: "NHAXUATBAN" });

module.exports = mongoose.model("NHAXUATBAN", NhaXuatBanSchema);
