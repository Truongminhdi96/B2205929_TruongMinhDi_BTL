const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const theodoiCtrl = require("../controllers/theodoi.controller");

// Lấy lịch sử mượn của 1 user
router.get("/user/:id", auth.verifyToken, theodoiCtrl.getUserBorrows);

// Trả sách
router.post("/return/:id", auth.verifyToken, theodoiCtrl.returnBook);

module.exports = router;
