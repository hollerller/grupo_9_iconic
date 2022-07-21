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
    store: (req,res)=>{
        
        let newProduct = {
            id: (products.length+1),
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            subCategory:req.body.subCategory,
            description: req.body.description,
            image: req.file.filename,
            inSale: req.body.inSale
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath,JSON.stringify(products)); 

        res.redirect("/products");
},
    editProduct: (req,res) => {

        let idUrl = req.params.id;
        let product = products.find(product => product.id == idUrl)
        res.render('editProducts',{ product:product })

    },
    //Crear productos: POST//
   
}

module.exports = productController;