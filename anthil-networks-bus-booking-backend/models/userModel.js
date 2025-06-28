const db = require('./db');

const createUser = (name, email, password, role = 'user', callback) => {
  db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [name, email, password, role], callback);
};

const findUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

const updateRefreshToken = (email, token, callback) => {
  db.run(`UPDATE users SET refreshToken = ? WHERE email = ?`, [token, email], callback);
};

module.exports = { createUser, findUserByEmail, updateRefreshToken };
