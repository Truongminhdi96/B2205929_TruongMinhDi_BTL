const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/theodoi.controller");
const auth = require("../middleware/auth");

// Lấy lịch sử mượn theo User
router.get("/user/:id", auth.verifyToken, ctrl.getByUser);

// Lấy toàn bộ theo dõi mượn (admin)
router.get("/", auth.verifyToken, ctrl.getAll);

// Thống kê
router.get("/stats", auth.verifyToken, ctrl.getStats);

// Admin duyệt mượn
router.post("/approve/:id", auth.verifyToken, ctrl.approveBorrow);

// Xác nhận trả sách
router.post("/return/:id", auth.verifyToken, ctrl.returnBook);

router.get("/countBorrow/:id", auth.verifyToken, ctrl.countBorrow);

module.exports = router;
