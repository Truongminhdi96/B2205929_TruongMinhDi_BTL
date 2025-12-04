const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DocGia = require('../models/DOCGIA');
const NhanVien = require('../models/NhanVien');

// ====================== REGISTER DOCGIA ======================
exports.register = async (req, res) => {
  try {
    console.log("🔥 REQ BODY REGISTER:", req.body);
    const { HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai, Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Thiếu Email hoặc Password!" });
    }

    const exist = await DocGia.findOne({ Email });
    if (exist) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashed = await bcrypt.hash(Password, 10);

    const user = new DocGia({
      HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai,
      Email,
      Password: hashed
    });

    await user.save();
    res.json({ message: "Đăng ký thành công" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================== LOGIN DOCGIA + NHANVIEN ======================
exports.login = async (req, res) => {
  try {
    const Email = req.body.Email || req.body.email;
    const Password = req.body.Password || req.body.password;
    const MSNV = req.body.MSNV || req.body.msnv;

    let user = null;
    let role = null;

    // --------------------------
    // 1) Login DOCGIA bằng Email
    // --------------------------
    if (Email) {
      user = await DocGia.findOne({ Email });
      if (!user) return res.status(400).json({ message: "Email không tồn tại!" });

      const ok = await bcrypt.compare(Password, user.Password);
      if (!ok) return res.status(400).json({ message: "Sai mật khẩu!" });

      role = "docgia";
      const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

      return res.json({
        token,
        user: {
          id: user._id,
          role,
          name: user.Ten,
          Email: user.Email
        }
      });
    }

    // --------------------------
    // 2) LOGIN NHÂN VIÊN bằng MSNV
    // --------------------------
    if (MSNV) {
      const msnvNormalized = MSNV.toUpperCase(); // chuẩn hóa MSNV
      console.log("🔍 Login admin với MSNV:", msnvNormalized);

      user = await NhanVien.findOne({ MSNV: msnvNormalized });

      if (!user) return res.status(400).json({ message: "MSNV không tồn tại!" });

      const ok = await bcrypt.compare(Password, user.Password);
      if (!ok) return res.status(400).json({ message: "Sai mật khẩu!" });

      role = "admin";
      const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

      return res.json({
        token,
        user: {
          id: user._id,
          role,
          MSNV: user.MSNV,
          name: user.HoTenNV
        }
      });
    }

    return res.status(400).json({ message: "Thiếu Email hoặc MSNV để đăng nhập!" });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
