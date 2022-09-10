const ordersController = require('../controllers/ordersController');
const express = require('express');
const router = express.Router();


router.get('/boton', ordersController.mostrarBoton);

//router.get('/checkout/:id', ordersController.processCart);