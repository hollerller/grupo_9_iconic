const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

// punto 1. sprint 4
router.get('/',productController.list);

// punto 2. sprint 4

router.get('/create', productController.createProduct)

//punto 3 sprint 4
router.get('/:id', productController.productID);

//punto 4 sprint 4 - Creación de productos por POST//
router.post('/create',productController.store)
//punto 5 sprint 4

router.get('/:id/edit', productController.editProduct)





//router.get('/create', productController)

module.exports = router;