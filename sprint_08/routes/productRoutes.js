const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//requerir el authMiddleware
const authMiddleware = require('../middlewares/authMiddleware');

//Validaciones 
const createValidations = require('../middlewares/validations/productCreateValidations');
const editValidations = require('../middlewares/validations/productEditValidations');

//requiriendo el controlador//
const productController = require('../controllers/productController');

//Configurando multer storage//
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/images/products');
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
   }
})
//Variable upload//
const uploadFile = multer({ storage });

// punto 1. sprint 4
router.get('/', productController.list);

// punto 2. sprint 4 - CREACIÓN DE PRODUCTOS mostrar formulario

router.get('/create', authMiddleware, productController.createProduct)

//punto 3 sprint 4
router.get('/:id', productController.productID);

//punto 4 sprint 4 - Creación de productos por POST//
router.post('/create', uploadFile.single('image'), createValidations, productController.store)

//punto 5 sprint 4 Editar productos

router.get('/:id/edit', authMiddleware, productController.editProduct);
router.put('/:id/edit', uploadFile.single('image'), editValidations, productController.saveChanges);

router.get('/:id/delete', authMiddleware,productController.delete);

// APIS productos

router.get('/api/products',productController.apiList)

router.get('/api/products/:id', productController.productDetail)

module.exports = router;