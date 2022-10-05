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

//Validaciones 
const editValidations = require('../middlewares/validations/userEditValidations');
const registerValidations = require('../middlewares/validations/registerValidations');
const loginValidations = require('../middlewares/validations/loginValidations');

//Multer para lectura y almacenamiento de avatar

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

const uploadFile = multer({storage});

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
router.put('/edit/:id', uploadFile.single('avatar'), editValidations, usersController.processEdition);

//logout
router.get('/logout', usersController.logout);

//Eliminar Usuario
router.delete('/:id/delete',usersController.deleteUser);

//APIs lista de usuarios

router.get('/api/users', usersController.userList);

//API detalle de usuario

router.get('/api/users/:id',usersController.userDetail);

module.exports = router;

