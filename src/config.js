require('dotenv').config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET tidak ditemukan di environment variables");
}

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
};
