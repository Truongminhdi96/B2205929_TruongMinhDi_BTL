const TheoDoi = require('../models/THEODOIMUONSACH');
const Sach = require('../models/SACH');

exports.requestBorrow = async (req, res) => {
  try {
    const { maSach } = req.body;
    const maDocGia = req.user.id;
    const sach = await Sach.findById(maSach);
    if (!sach) return res.status(404).json({ message: 'Sach not found' });
    if (sach.soQuyen <= 0) return res.status(400).json({ message: 'No copies available' });
    const reqDoc = new TheoDoi({ maDocGia, maSach, trangThai: 'cho_duyet' });
    await reqDoc.save();
    res.json(reqDoc);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listForUser = async (req, res) => {
  try {
    const data = await TheoDoi.find({ maDocGia: req.user.id }).populate('maSach');
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listAll = async (req, res) => {
  try {
    const data = await TheoDoi.find().populate('maSach').populate('maDocGia');
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.confirmBorrow = async (req, res) => {
  try {
    const id = req.params.id; // theoDoi id
    const record = await TheoDoi.findById(id);
    if (!record) return res.status(404).json({ message: 'Not found' });
    if (record.trangThai !== 'cho_duyet') return res.status(400).json({ message: 'Invalid status' });

    // decrement book copies
    const sach = await Sach.findById(record.maSach);
    if (sach.soQuyen <= 0) return res.status(400).json({ message: 'No copies' });
    sach.soQuyen -= 1;
    await sach.save();

    record.trangThai = 'da_duoc_muon';
    record.ngayMuon = new Date();
    record.nguoiXacNhan = req.user.id;
    await record.save();
    res.json(record);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.confirmReturn = async (req, res) => {
  try {
    const id = req.params.id; // theoDoi id
    const record = await TheoDoi.findById(id);
    if (!record) return res.status(404).json({ message: 'Not found' });
    if (record.trangThai !== 'da_duoc_muon') return res.status(400).json({ message: 'Invalid status' });
    record.trangThai = 'da_tra';
    record.ngayTra = new Date();
    await record.save();

    // increase book copies
    const sach = await Sach.findById(record.maSach);
    sach.soQuyen += 1;
    await sach.save();

    res.json(record);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.cancelRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const rec = await TheoDoi.findById(id);
    if (!rec) return res.status(404).json({ message: 'Not found' });
    if (rec.trangThai !== 'cho_duyet') return res.status(400).json({ message: 'Cannot cancel' });
    rec.trangThai = 'bi_huy';
    await rec.save();
    res.json(rec);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
