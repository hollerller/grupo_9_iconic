// Express Validator
const { body } = require("express-validator");

const editValidations = [
   body('fullname').notEmpty().withMessage('El campo de Nombre y Apellido no puede quedar vacío'),
   body('username').notEmpty().withMessage('El campo usuario no puede quedar vacío'),
   body('email').isEmail().withMessage('Debes ingresar un email válido'),
   body('birthday').isDate().withMessage('Debes ingresar tu fecha de nacimiento'),
   // body('avatar').custom((value, { req } ) => {
   //    let file = req.file;
   //    if (!file) {
   //       throw new Error ('Tienes que subir una imagen de perfil');
   //    } else {
   //       return true;
   //    }
   // })
]

module.exports = editValidations;