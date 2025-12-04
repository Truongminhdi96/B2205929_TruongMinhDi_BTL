const NXB = require('../models/NHAXUATBAN');

exports.create = async (req, res) => {
  try {
    const n = new NXB(req.body); await n.save(); res.json(n);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.list = async (req, res) => {
  try { const data = await NXB.find(); res.json(data); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try { const n = await NXB.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(n); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try { await NXB.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
};
