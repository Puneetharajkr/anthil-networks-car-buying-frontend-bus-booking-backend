const db = require('./db');

// ADD ROUTE
exports.addRoute = (data, callback) => {
  const { origin, destination, travel_time, stops, bus_id } = data;

  db.get('SELECT * FROM buses WHERE id = ?', [bus_id], (err, bus) => {
    if (err) return callback(err);
    if (!bus) return callback({ message: `Bus with ID ${bus_id} not found`, code: 400 });

    const query = 'INSERT INTO routes (origin, destination, travel_time, stops, bus_id) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [origin, destination, travel_time, stops, bus_id], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM routes WHERE id = ?', [this.lastID], (err, route) => {
        if (err) return callback(err);
        callback(null, { message: 'Route added', route });
      });
    });
  });
};

// UPDATE ROUTE
exports.updateRoute = (id, data, callback) => {
  const { origin, destination, travel_time, stops } = data;
  db.get('SELECT * FROM routes WHERE id = ?', [id], (err, route) => {
    if (err) return callback(err);
    if (!route) return callback({ message: `Route with ID ${id} not found`, code: 404 });

    const query = 'UPDATE routes SET origin = ?, destination = ?, travel_time = ?, stops = ? WHERE id = ?';
    db.run(query, [origin, destination, travel_time, stops, id], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM routes WHERE id = ?', [id], (err, updatedRoute) => {
        if (err) return callback(err);
        callback(null, { message: 'Route updated', route: updatedRoute });
      });
    });
  });
};

// DELETE ROUTE
exports.deleteRoute = (id, callback) => {
  db.get('SELECT * FROM routes WHERE id = ?', [id], (err, route) => {
    if (err) return callback(err);
    if (!route) return callback({ message: `Route with ID ${id} not found`, code: 404 });

    db.run('DELETE FROM routes WHERE id = ?', [id], function (err) {
      if (err) return callback(err);
      callback(null, { message: `Route with ID ${id} deleted` });
    });
  });
};
