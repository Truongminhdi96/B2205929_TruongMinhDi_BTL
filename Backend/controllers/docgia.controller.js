const DocGia = require('../models/DOCGIA');
const bcrypt = require('bcryptjs');

exports.list = async (req, res) => {
  try { const data = await DocGia.find().select('-password'); res.json(data); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.get = async (req, res) => {
  try { const d = await DocGia.findById(req.params.id).select('-password'); res.json(d); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const body = req.body;
    if (body.password) body.password = await bcrypt.hash(body.password, 10);
    const d = await DocGia.findByIdAndUpdate(req.params.id, body, { new: true }).select('-password');
    res.json(d);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try { await DocGia.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
};
