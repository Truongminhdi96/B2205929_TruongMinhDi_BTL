const express = require('express');
const router = express.Router();
const nxbCtrl = require('../controllers/nxb.controller');
const auth = require('../middleware/auth');

router.get('/', nxbCtrl.list);
router.post('/', auth.verifyToken, auth.requireRole(['admin']), nxbCtrl.create);
router.put('/:id', auth.verifyToken, auth.requireRole(['admin']), nxbCtrl.update);
router.delete('/:id', auth.verifyToken, auth.requireRole(['admin']), nxbCtrl.remove);

module.exports = router;
