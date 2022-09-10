const ordersController = require('../controllers/ordersController');
const express = require('express');
const router = express.Router();


router.post('/checkout/:id', ordersController.processCart);

//router.get('/checkout/:id', ordersController.processCart);

module.exports = router;