const db = require('./db');

// ✅ BOOK BUS WITH VALIDATION
exports.bookBus = (booking, callback) => {
  const { user_id, bus_id, route_id, seats_booked, booking_date } = booking;

  db.get('SELECT * FROM buses WHERE id = ?', [bus_id], (err, bus) => {
    if (err) return callback(err);
    if (!bus) return callback({ message: `Bus with ID ${bus_id} not found`, code: 404 });

    db.get('SELECT * FROM routes WHERE id = ?', [route_id], (err, route) => {
      if (err) return callback(err);
      if (!route) return callback({ message: `Route with ID ${route_id} not found`, code: 404 });

      const query = 'INSERT INTO bookings (user_id, bus_id, route_id, seats_booked, booking_date) VALUES (?, ?, ?, ?, ?)';
      db.run(query, [user_id, bus_id, route_id, seats_booked, booking_date], function (err) {
        if (err) return callback(err);
        callback(null, { message: 'Bus booked', booking_id: this.lastID });
      });
    });
  });
};

// ✅ CANCEL BOOKING WITH VALIDATION
exports.cancelBooking = (id, callback) => {
  db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, booking) => {
    if (err) return callback(err);
    if (!booking) return callback({ message: `Booking with ID ${id} not found`, code: 404 });

    db.run('DELETE FROM bookings WHERE id = ?', [id], function (err) {
      if (err) return callback(err);
      callback(null, { message: 'Booking cancelled' });
    });
  });
};
