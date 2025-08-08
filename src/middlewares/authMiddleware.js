const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'rahasia';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ error: 'Token tidak ada' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Token tidak valid' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token tidak valid/expired' });
    req.user = decoded; // simpan data user dari token
    next();
  });
};

module.exports = authMiddleware;
