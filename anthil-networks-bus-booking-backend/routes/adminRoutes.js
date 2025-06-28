const express = require('express');
const router = express.Router();
const { addBus, updateBus, deleteBus, addRoute, updateRoute, deleteRoute,getAllBuses } = require('../controllers/adminController');
const { authenticate, authorizeAdmin } = require('../middlewares/auth');

router.use(authenticate, authorizeAdmin);

router.get('/buses', authenticate, getAllBuses);

router.post('/bus', addBus);
router.put('/bus/:id', updateBus);
router.delete('/bus/:id', deleteBus);

router.post('/route', addRoute);
router.put('/route/:id', updateRoute);
router.delete('/route/:id', deleteRoute);

module.exports = router;
