const mongoose = require("mongoose");
require("dotenv").config();

async function createCollections() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Kết nối MongoDB OK");

  const collections = [
    "DOCGIA",
    "NhanVien",
    "NHAXUATBAN",
    "SACH",
    "THEODOIMUONSACH"
  ];

  for (const c of collections) {
    await mongoose.connection.createCollection(c);
    console.log("✔ Tạo bảng:", c);
  }

  console.log("🎉 Hoàn tất – đã tạo đúng 5 bảng giống PDF");
  process.exit();
}

createCollections();
