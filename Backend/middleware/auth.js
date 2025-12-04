const jwt = require('jsonwebtoken');
const DOCGIA = require('../models/DOCGIA');
const NhanVien = require('../models/NhanVien');

const auth = {};

auth.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

auth.requireRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No user' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = auth;
