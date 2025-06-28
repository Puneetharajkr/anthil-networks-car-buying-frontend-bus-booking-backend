const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./busbooking.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user',
    refreshToken TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS buses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT,
    capacity INTEGER,
    type TEXT,
    amenities TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    origin TEXT,
    destination TEXT,
    travel_time TEXT,
    stops TEXT,
    bus_id INTEGER,
    FOREIGN KEY(bus_id) REFERENCES buses(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    bus_id INTEGER,
    route_id INTEGER,
    seats_booked INTEGER,
    booking_date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
