const express = require('express');
const router = express.Router();
const sachCtrl = require('../controllers/sach.controller');
const auth = require('../middleware/auth');

router.get('/', sachCtrl.list);
router.get('/:id', sachCtrl.get);
router.post('/', auth.verifyToken, auth.requireRole(['admin']), sachCtrl.create);
router.put('/:id', auth.verifyToken, auth.requireRole(['admin']), sachCtrl.update);
router.delete('/:id', auth.verifyToken, auth.requireRole(['admin']), sachCtrl.remove);

module.exports = router;
