const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = { generateAccessToken, generateRefreshToken };
