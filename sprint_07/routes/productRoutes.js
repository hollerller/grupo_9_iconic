const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//requiriendo express-validator//
const {body} = require('express-validator');
//requerir el authMiddleware
const authMiddleware = require('../middlewares/authMiddleware');

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

//Creando validaciones para el formulario de creación de productos//
const createValidations = [
   body('prodName').notEmpty().withMessage('Tenés que completar el nombre del producto'),
   body('description').notEmpty().withMessage('Por favor, agregá una breve descripción del producto'),
   body('price').notEmpty().withMessage('Tenés que indicar el precio del producto'),
   body('image').custom((value, { req } ) => {
      let file = req.file;
      if (!file) {
         throw new Error ('Tenés que subir una imagen del producto');
      } else {
         return true;
      }
   })
]

// punto 1. sprint 4
router.get('/',productController.list);

// punto 2. sprint 4 - CREACIÓN DE PRODUCTOS mostrar formulario

router.get('/create', authMiddleware,productController.createProduct)

//punto 3 sprint 4
router.get('/:id', productController.productID);

//punto 4 sprint 4 - Creación de productos por POST//
router.post('/create',uploadFile.single('image'),createValidations,productController.store)
//punto 5 sprint 4

router.get('/:id/edit', authMiddleware,productController.editProduct);
router.put('/:id/edit', uploadFile.single('image'), productController.saveChanges);
router.get('/:id/delete',productController.delete);


//router.get('/create', productController)

module.exports = router;