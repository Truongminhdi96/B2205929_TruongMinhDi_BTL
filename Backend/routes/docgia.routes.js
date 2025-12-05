const express = require('express');
const router = express.Router();
const docgiaCtrl = require('../controllers/docgia.controller');
const auth = require('../middleware/auth');

router.get('/', auth.verifyToken, auth.requireRole(['admin']), docgiaCtrl.list);
router.get('/:id', auth.verifyToken, docgiaCtrl.get);
router.put('/:id', auth.verifyToken, docgiaCtrl.update);
router.delete('/:id', auth.verifyToken, auth.requireRole(['admin']), docgiaCtrl.remove);

/* 🔥 SỬA ĐÚNG TÊN BIẾN  */
router.put("/lock/:id", auth.verifyToken, docgiaCtrl.updateTrangThai);

module.exports = router;
