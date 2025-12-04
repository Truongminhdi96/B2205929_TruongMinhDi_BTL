require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// =================== Schema NhanVien ===================
const NhanVienSchema = new mongoose.Schema({
  MSNV: { type: String, unique: true },
  HoTenNV: String,
  Password: String,
  Chucvu: String,
  Diachi: String,
  SoDienThoai: String,
});

// Thêm tham số thứ 3 là tên collection thực tế
const NhanVien = mongoose.model("NhanVien", NhanVienSchema, "NhanVien");

// =================== Kết nối MongoDB ===================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/LibraryDB";

async function createAdmin() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Kiểm tra nếu admin đã tồn tại
    const existing = await NhanVien.findOne({ MSNV: "ADMIN001" });
    if (existing) {
      console.log("⚠️ Admin đã tồn tại:", existing);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Tạo admin
    const admin = await NhanVien.create({
      MSNV: "ADMIN001",
      HoTenNV: "Admin",
      Password: hashedPassword,
      Chucvu: "admin",
      Diachi: "Hanoi",
      SoDienThoai: "0123456789",
    });

    console.log("🎉 Admin created successfully!");
    console.log(admin);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
