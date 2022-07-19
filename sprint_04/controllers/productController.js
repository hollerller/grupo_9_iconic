const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
    //rutas GET//
    list: (request, response) => {
        response.render('products',{list : products})
    },
    productID: (req, res) => {
        let productId = req.params.id;
        const product = products.find(element=>element.id == productId);
        if (productId != undefined) {
           res.render('productDetail', {product:product });
        }
    },
    createProduct: (req,res) => {
        res.render('createProducts')
    },
    editProduct: (req,res) => {
        res.render('editProducts')
    },
    //Crear productos: POST//
    store: (req,res)=>{
        let file = req.file;
        if(!file){
            const error = new Error('Por favor seleccioná un archivo');
            error.httpStatusCode=400;
            return error
        }else{
            
                let newProduct = {
                    id: (products.length+1),
                    name: req.body.name,
                    price: req.body.price,
                    discount: req.body.discount,
                    category: req.body.category,
                    subCategory:req.body.subCategory,
                    description: req.body.description,
                    image: req.file.filename
                };
                products.push(newProduct);
                fs.writeFileSync(productsFilePath,JSON.stringify(products)); 
        }
        res.redirect("/products");
    }
}

module.exports = productController;