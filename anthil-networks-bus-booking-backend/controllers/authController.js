const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { createUser, findUserByEmail, updateRefreshToken } = require('../models/userModel');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  createUser(name, email, hash, role, (err) => {
    if (err) return res.status(400).json({ message: 'User already exists' });
    res.status(201).json({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, async (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    updateRefreshToken(email, refreshToken, () => {
      res.json({ accessToken, refreshToken });
    });
  });
};
