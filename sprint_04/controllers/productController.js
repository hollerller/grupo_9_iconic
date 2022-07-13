const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const productArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
    list: (request, response) => {
        response.render('productList', {
            lista: productArray
        });
    },
    productID: (req, res) => {
        let productId = req.params.id;
        if (productId != undefined) {
           res.render('productDetail');
           //console.log('productos');
        }
    }
}

module.exports = productController;