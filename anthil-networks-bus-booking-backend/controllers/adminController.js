const { addBus, updateBus, deleteBus,getAllBuses } = require('../models/busModel');
const { addRoute, updateRoute, deleteRoute } = require('../models/routeModel');

exports.addBus = (req, res) => addBus(req.body, (err, result) => {
    if (err) return res.status(err.code || 400).json({ message: err.message || 'Failed to add bus' });
    res.json(result);
  });

  exports.updateBus = (req, res) => updateBus(req.params.id, req.body, (err, result) => {
    if (err) return res.status(err.code || 400).json({ message: err.message || 'Update failed' });
    res.json(result);
  });

  exports.deleteBus = (req, res) => deleteBus(req.params.id, (err, result) => {
    if (err) return res.status(err.code || 400).json({ message: err.message || 'Deletion failed' });
    res.json(result);
  });

  exports.addRoute = (req, res) => addRoute(req.body, (err, result) => {
    if (err) return res.status(err.code || 400).json({ message: err.message || 'Route add failed' });
    res.json(result);
  });

  exports.updateRoute = (req, res) => updateRoute(req.params.id, req.body, (err, result) => {
    if (err) return res.status(err.code || 400).json({ message: err.message || 'Update failed' });
    res.json(result);
  });

  exports.deleteRoute = (req, res) => deleteRoute(req.params.id, (err, result) => {
    if (err) return res.status(err.code || 400).json({ message: err.message || 'Route delete failed' });
    res.json(result);
  });


  exports.getAllBuses = (req, res) => {
    getAllBuses((err, buses) => {
      if (err) return res.status(500).json({ message: 'Failed to retrieve buses' });
      res.json({ buses });
    });
  };