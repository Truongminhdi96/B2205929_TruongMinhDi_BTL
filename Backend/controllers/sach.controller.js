const Sach = require('../models/SACH');

exports.create = async (req, res) => {
  try {
    const s = new Sach(req.body);
    await s.save();
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.list = async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? { tenSach: { $regex: q, $options: 'i' } } : {};
    const data = await Sach.find(filter).populate('maNXB');
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.get = async (req, res) => {
  try {
    const s = await Sach.findById(req.params.id).populate('maNXB');
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const s = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Sach.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
