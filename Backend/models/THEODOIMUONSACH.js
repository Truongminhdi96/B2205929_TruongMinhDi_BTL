const mongoose = require("mongoose");

const TheoDoiMuonSchema = new mongoose.Schema({
  MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: "DOCGIA", required: true },
  MaSach: { type: mongoose.Schema.Types.ObjectId, ref: "SACH", required: true },
  NgayMuon: { type: Date, default: Date.now },
  NgayTra: { type: Date, required: true } // bắt buộc phải có ngày trả
}, { collection: "THEODOIMUONSACH" });

module.exports = mongoose.model("THEODOIMUONSACH", TheoDoiMuonSchema);
