const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//requerir el controlador
const usersController = require('../controllers/userController');
// requerir el guestMiddleware
const guestMiddleware = require('../middlewares/guestMiddleware');
//requerir el authMiddleware
const authMiddleware = require('../middlewares/authMiddleware');


// Express Validator
const { body } = require('express-validator');

//Multer para lectura y almacenamiento de avatar

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

const uploadFile = multer({storage});

//validaciones de login

const loginValidations = [
   body('usuario').notEmpty().withMessage('Ingresa tu nombre de usuario'),
   body('contrasena').notEmpty().withMessage('Ingresa tu contraseña')
]

//validaciones de registro
const registerValidations = [
   body('nombreYApellido').notEmpty().withMessage('El campo de Nombre y Apellido no puede quedar vacío'),
   body('usuario').notEmpty().withMessage('El campo usuario no puede quedar vacío'),
   body('email').isEmail().withMessage('Debes ingresar un email válido'),
   body('contrasena').isLength({ min: 8}).withMessage('La contraseña debe contener minimo 8 caracteres'),
   body('contrasenaConf').isLength({ min: 8}).withMessage('La contraseña debe contener minimo 8 caracteres').bail().custom((value, { req }) => {
      if (value !== req.body.contrasena) {
        throw new Error('Las contraseñas deben ser iguales');
      }else{
         return true;
      }
      
    }),
   body('fechaNacimiento').isDate().withMessage('Debes ingresar tu fecha de nacimiento'),
   body('avatar').custom((value, { req } ) => {
      let file = req.file;
      if (!file) {
         throw new Error ('Tienes que subir una imagen de perfil');
      } else {
         return true;
      }
   })
]
/*
const editValidations = [
   body('fullname').notEmpty().withMessage('El campo de Nombre y Apellido no puede quedar vacío'),
   body('username').notEmpty().withMessage('El campo usuario no puede quedar vacío'),
   body('email').isEmail().withMessage('Debes ingresar un email válido'),
   body('birthday').isDate().withMessage('Debes ingresar tu fecha de nacimiento'),
   body('avatar').custom((value, { req } ) => {
      let file = req.file;
      if (!file) {
         throw new Error ('Tienes que subir una imagen de perfil');
      } else {
         return true;
      }
   })
]
*/
//Formulario de registro
router.get('/register', guestMiddleware, usersController.register);
//Procesar el formulario de registro
router.post('/register', uploadFile.single('avatar'), registerValidations, usersController.createUser);


//Formulario de login
router.get('/login',guestMiddleware, usersController.login);
//Procesar el login
router.post('/login', loginValidations, usersController.processLogin);


//Perfil de usuario
router.get('/profile', authMiddleware, usersController.userID);

//Editar usuario
router.get('/edit/:id', authMiddleware, usersController.editUser)
//Procesar la edicion
router.put('/edit/:id', uploadFile.single('avatar'), usersController.processEdition);

//logout
router.get('/logout', usersController.logout);

//Eliminar Usuario
router.delete('/:id/delete',usersController.deleteUser);

// Mostrar carrito de compras

//router.get('/checkout/:id',usersController.shoppingCart);

//Procesar orden




module.exports = router;

