const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { getAllBuses,searchBuses, book, cancel } = require('../controllers/userController');

router.get('/buses', authenticate, getAllBuses);

router.get('/search', authenticate, searchBuses);
router.post('/book', authenticate, book);
router.delete('/cancel/:id', authenticate, cancel);

module.exports = router;
