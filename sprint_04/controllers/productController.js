const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
    list: (request, response) => {
        response.render('products',{list : products})
    },
    productID: (req, res) => {
        let productId = req.params.id;
        if (productId != undefined) {
           res.render('productDetail');
           //console.log('productos');
        }
    },
    createProduct: (req,res) => {
        res.render('createProducts')
    },
    editProduct: (req,res) => {
        res.render('editProducts')
    }
}

module.exports = productController;