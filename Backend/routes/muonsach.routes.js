const express = require('express');
const router = express.Router();
const muonCtrl = require('../controllers/muonsach.controller');
const auth = require('../middleware/auth');

router.post('/', auth.verifyToken, muonCtrl.borrow);                // tạo đơn mượn
router.post('/confirm/:id', auth.verifyToken, muonCtrl.confirmBorrow); // xác nhận mượn
router.post('/return/:id', auth.verifyToken, muonCtrl.returnBook);      // trả sách
router.get('/user', auth.verifyToken, muonCtrl.userBorrowHistory);     // lịch sử user

module.exports = router;
