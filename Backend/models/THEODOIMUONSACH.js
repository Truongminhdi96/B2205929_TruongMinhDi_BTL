const mongoose = require("mongoose");

const TheoDoiMuonSchema = new mongoose.Schema({
  MaDocGia: String,
  MaSach: String,
  NgayMuon: Date,
  NgayTra: Date
}, { collection: "THEODOIMUONSACH" });

module.exports = mongoose.model("THEODOIMUONSACH", TheoDoiMuonSchema);
