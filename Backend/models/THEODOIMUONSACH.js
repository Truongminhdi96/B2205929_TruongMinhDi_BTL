const mongoose = require("mongoose");

const TheoDoiMuonSchema = new mongoose.Schema({
  MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: "DOCGIA", required: true },
  MaSach: { type: mongoose.Schema.Types.ObjectId, ref: "SACH", required: true },
  NgayMuon: { type: Date, default: Date.now },
  NgayTra: { type: Date, required: true }, // ngày dự kiến trả, do user chọn
  NgayTraThucTe: { type: Date, default: null }, // ngày trả thực tế
  TrangThai: { 
    type: String, 
    enum: ["Đang xét duyệt", "Đã mượn", "Đã trả"], 
    default: "Đang xét duyệt" 
  }
}, { collection: "THEODOIMUONSACH" });

module.exports = mongoose.model("THEODOIMUONSACH", TheoDoiMuonSchema);
