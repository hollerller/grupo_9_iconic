// Express Validator
const { body } = require("express-validator");

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


module.exports = registerValidations;