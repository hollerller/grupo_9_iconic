const { body } = require("express-validator");

const editValidations = [
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

 module.exports = editValidations; 