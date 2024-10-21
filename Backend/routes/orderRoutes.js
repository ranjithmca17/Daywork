// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const validateOrder = require('../Middleware/validateOrder');
const {
    createOrder,
    getLatestOrder,
    getTodaySales,
    getOrdersByPhoneNumber,
    getOnChangeValue
} = require('../Controllers/orderController');

// Routes
router.post('/order', validateOrder, createOrder);
router.get('/latest-order', getLatestOrder);
router.get('/todaySales', getTodaySales);
router.get('/orders/byPhoneNumber', getOrdersByPhoneNumber);
router.get('/getOnchangeValue', getOnChangeValue);

module.exports = router;
