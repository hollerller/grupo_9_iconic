const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/products', productController.list);

router.get('/products/:id', productController.productID)


module.exports = router;