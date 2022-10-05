const { body } = require("express-validator");


const loginValidations = [
   body('email').notEmpty().withMessage('Ingresa tu nombre de usuario'),
   body('contrasena').notEmpty().withMessage('Ingresa tu contraseña')
]

module.exports = loginValidations;