const express = require("express");
const router = express.Router();
const DocGia = require("../models/DOCGIA");
const Sach = require("../models/SACH");
const TheoDoiMuonSach = require("../models/THEODOIMUONSACH");

// 1️⃣ Tổng quan: tổng sách, tổng độc giả, tổng lượt mượn
router.get("/tongquan", async (req, res) => {
  try {
    const totalBooks = await Sach.countDocuments();
    const totalReaders = await DocGia.countDocuments();
    const totalBorrows = await TheoDoiMuonSach.countDocuments();

    res.json({
      success: true,
      data: { books: totalBooks, readers: totalReaders, borrows: totalBorrows },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2️⃣ Số lượt mượn theo tháng trong năm hiện tại
router.get("/muon-theo-thang", async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();

    // Aggregation: nhóm theo tháng
    const result = await TheoDoiMuonSach.aggregate([
      { 
        $match: { 
          NgayMuon: { 
            $gte: new Date(`${year}-01-01`), 
            $lte: new Date(`${year}-12-31`) 
          } 
        } 
      },
      {
        $group: {
          _id: { $month: "$NgayMuon" },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } } // sắp xếp theo tháng
    ]);

    // Chuyển _id thành month
    const data = result.map(item => ({ month: item._id, total: item.total }));

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3️⃣ Top 5 sách được mượn nhiều nhất
router.get("/top-sach", async (req, res) => {
  try {
    const result = await TheoDoiMuonSach.aggregate([
      { 
        $group: { 
          _id: "$MaSach", 
          LuotMuon: { $sum: 1 } 
        } 
      },
      { $sort: { LuotMuon: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "SACH",
          localField: "_id",
          foreignField: "_id",
          as: "sach"
        }
      },
      { $unwind: "$sach" },
      { $project: { TenSach: "$sach.TenSach", LuotMuon: 1 } }
    ]);

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
