const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// inject prisma
router.use((req, res, next) => {
  const { PrismaClient } = require('@prisma/client');
  req.prisma = new PrismaClient();
  next();
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
