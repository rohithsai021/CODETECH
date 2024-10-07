const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/checkout', createOrder);

module.exports = router;
