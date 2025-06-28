const db = require('./db');

// ADD BUS
exports.addBus = (data, callback) => {
  const { number, capacity, type, amenities } = data;
  const query = 'INSERT INTO buses (number, capacity, type, amenities) VALUES (?, ?, ?, ?)';
  db.run(query, [number, capacity, type, amenities], function (err) {
    if (err) return callback(err);
    db.get('SELECT * FROM buses WHERE id = ?', [this.lastID], (err, bus) => {
      if (err) return callback(err);
      callback(null, { message: 'Bus added', bus });
    });
  });
};

// UPDATE BUS
exports.updateBus = (id, data, callback) => {
  const { number, capacity, type, amenities } = data;
  db.get('SELECT * FROM buses WHERE id = ?', [id], (err, existing) => {
    if (err) return callback(err);
    if (!existing) return callback({ message: `Bus with ID ${id} not found`, code: 404 });

    const query = 'UPDATE buses SET number = ?, capacity = ?, type = ?, amenities = ? WHERE id = ?';
    db.run(query, [number, capacity, type, amenities, id], function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM buses WHERE id = ?', [id], (err, bus) => {
        if (err) return callback(err);
        callback(null, { message: 'Bus updated', bus });
      });
    });
  });
};

// DELETE BUS
exports.deleteBus = (id, callback) => {
  db.get('SELECT * FROM buses WHERE id = ?', [id], (err, bus) => {
    if (err) return callback(err);
    if (!bus) return callback({ message: `Bus with ID ${id} not found`, code: 404 });

    db.run('DELETE FROM buses WHERE id = ?', [id], function (err) {
      if (err) return callback(err);
      callback(null, { message: `Bus with ID ${id} deleted` });
    });
  });
};

// GET all busses
exports.getAllBuses = (callback) => {
    const query = 'SELECT * FROM buses';
    db.all(query, [], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  };
