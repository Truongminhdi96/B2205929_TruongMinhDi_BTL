require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Kết nối DB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/sach', require('./routes/sach.routes'));
app.use('/api/nxb', require('./routes/nxb.routes'));
app.use('/api/docgia', require('./routes/docgia.routes'));
app.use('/api/theodoi', require('./routes/theodoi.routes'));
app.use('/api/muonsach', require('./routes/muonsach.routes')); // chỉ cần 1 biến duy nhất
app.use('/api/theodoi', require('./routes/theodoi.routes'));

// Bắt route không tồn tại
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy API này!" });
});

// Bắt lỗi server
app.use((err, req, res, next) => {
  console.error("🔥 Lỗi server:", err);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên http://localhost:${PORT}`);
});
