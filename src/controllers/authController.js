const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await req.prisma.user.findUnique({ where: { username } });
    if (existing) return res.status(400).json({ error: 'Username sudah dipakai' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await req.prisma.user.create({
      data: { username, password: hashedPassword }
    });

    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Gagal register' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await req.prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: 'User tidak ditemukan' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Password salah' });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Gagal login' });
  }
};

module.exports = { register, login };
