const productController = {
    product: (request, response) => {
        response.render('home');
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