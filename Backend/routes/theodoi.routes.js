const express = require('express');
const router = express.Router();
const theodoiCtrl = require('../controllers/theodoi.controller');
const auth = require('../middleware/auth');

router.post('/request', auth.verifyToken, auth.requireRole(['docgia']), theodoiCtrl.requestBorrow);
router.get('/my', auth.verifyToken, auth.requireRole(['docgia']), theodoiCtrl.listForUser);
router.get('/', auth.verifyToken, auth.requireRole(['admin']), theodoiCtrl.listAll);
router.post('/:id/confirm', auth.verifyToken, auth.requireRole(['admin']), theodoiCtrl.confirmBorrow);
router.post('/:id/return', auth.verifyToken, auth.requireRole(['admin']), theodoiCtrl.confirmReturn);
router.post('/:id/cancel', auth.verifyToken, auth.requireRole(['docgia']), theodoiCtrl.cancelRequest);

module.exports = router;
