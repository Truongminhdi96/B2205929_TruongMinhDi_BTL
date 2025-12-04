require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

const DocGia = require('./models/DOCGIA');
const NhanVien = require('./models/NhanVien');
const Sach = require('./models/SACH');
const NXB = require('./models/NHAXUATBAN');

async function seed() {
  await connectDB();

  await DocGia.deleteMany();
  await NhanVien.deleteMany();
  await Sach.deleteMany();
  await NXB.deleteMany();

  const hashed = await bcrypt.hash('admin123', 10);

  const nv = await NhanVien.create({
    hoTen: 'Admin',
    email: 'admin@lib.local',
    password: hashed,
    chucVu: 'admin'
  });

  const nxb1 = await NXB.create({ tenNXB: 'NXB Giáo Dục', diaChi: 'Cần Thơ' });
  const nxb2 = await NXB.create({ tenNXB: 'NXB Văn Hóa', diaChi: 'HCM' });

  await Sach.create({
    tenSach: 'Lập Trình NodeJS',
    tacGia: 'Nguyễn A',
    namXuatBan: 2020,
    donGia: 120000,
    soQuyen: 3,
    maNXB: nxb1._id
  });

  await Sach.create({
    tenSach: 'Vue.js Cơ Bản',
    tacGia: 'Trần B',
    namXuatBan: 2022,
    donGia: 150000,
    soQuyen: 2,
    maNXB: nxb2._id
  });

  console.log('Seed dữ liệu mẫu thành công!');
  process.exit(0);
}

seed();
