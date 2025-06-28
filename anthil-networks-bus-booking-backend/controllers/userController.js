const db = require('../models/db');
const { bookBus, cancelBooking } = require('../models/bookingModel');

const { getAllBuses } = require('../models/busModel'); 

exports.getAllBuses = (req, res) => {
    getAllBuses((err, buses) => {
      if (err) return res.status(500).json({ message: 'Failed to retrieve buses' });
      res.json({ buses });
    });
  };


exports.searchBuses = (req, res) => {
  const { origin, destination } = req.query;
  db.all(`SELECT buses.*, routes.origin, routes.destination FROM buses
    JOIN routes ON buses.id = routes.bus_id
    WHERE routes.origin = ? AND routes.destination = ?`,
    [origin, destination],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Search failed' });
      res.json(rows);
    });
};

exports.book = (req, res) => {
  const booking = {
    user_id: req.user.id,
    ...req.body,
    booking_date: new Date().toISOString()
  };
  bookBus(booking, (err) => {
    if (err) return res.status(400).json({ message: 'Booking failed' });
    res.json({ message: 'Bus booked' });
  });
};

exports.cancel = (req, res) => cancelBooking(req.params.id, (err) => {
  if (err) return res.status(400).json({ message: 'Cancel failed' });
  res.json({ message: 'Booking cancelled' });
});
