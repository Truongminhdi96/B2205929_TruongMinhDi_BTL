const express = require('express');
const router = express.Router();
const muonCtrl = require('../controllers/muonsach.controller');
const auth = require('../middleware/auth');

router.post('/', auth.verifyToken, muonCtrl.borrow);          // Mượn sách
router.post('/return', auth.verifyToken, muonCtrl.returnBook); // Trả sách

module.exports = router;
