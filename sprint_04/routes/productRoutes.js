const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//requiriendo el controlador//
const productController = require('../controllers/productController');

//Configurando multer storage//
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/products'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })
  //Variable upload//
const uploadFile = multer({storage});

// punto 1. sprint 4
router.get('/',productController.list);

// punto 2. sprint 4 - CREACIÓN DE PRODUCTOS POR GET

router.get('/create', productController.createProduct)

//punto 3 sprint 4
router.get('/:id', productController.productID);

//punto 4 sprint 4 - Creación de productos por POST//
router.post('/create', uploadFile.single('image'),productController.store)
//punto 5 sprint 4

router.get('/:id/edit', productController.editProduct);
router.put('/:id/edit',productController.saveChanges);
router.delete('/:id/delete',productController.delete);







//router.get('/create', productController)

module.exports = router;