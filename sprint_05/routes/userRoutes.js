const express = require('express');
const router = express.Router();
const multer = require('multer');
//requerir el controlador
const userController = require('../controllers/userController');

//Multer para lectura y almacenamiento de avatar

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

const uploadFile = multer({storage});



router.get('/:id', userController.userID);




module.exports = router;

