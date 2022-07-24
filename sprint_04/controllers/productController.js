const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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
    //Crear productos: GET//
    createProduct: (req,res) => {
        res.render('createProducts')
    },
    //Crear productos: POST//
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
        fs.writeFileSync(productsFilePath,JSON.stringify(products, null, ' ')); 

        res.redirect("/products");
},
//Editar productos: GET//
    editProduct: (req,res) => {

        let idUrl = req.params.id;
        let product = products.find(product => product.id == idUrl);
        res.render('editProducts',{ product:product })

    },
    //Editar productos: PUT//
    saveChanges: (req,res) =>{
        let idUrl = req.params.id;
        
       let editedList =  products.map(element=>{
            if(element.id ==idUrl){
                element.name= req.body.name;
                element.price= req.body.price;
                element.discount= req.body.discount;
                element.category= req.body.category;
                element.subCategory=req.body.subCategory;
                element.description= req.body.description;
                element.image= req.file.filename;
                element.inSale= req.body.inSale;
                element.size=req.body.size
            }
            return element
        })
        fs.writeFileSync(productsFilePath,JSON.stringify(editedList, null, ' '));   
        const product = editedList.find(element=>element.id == idUrl);
        if (idUrl != undefined) {
            res.render('productDetail',{ product: product })
        }    
    },
    //ruta DELETE
    delete:(req,res)=>{
        let idUrl = req.params.id;

        let newList = products.filter(element=>element.id!=idUrl)
        products =newList;
        fs.writeFileSync(productsFilePath,JSON.stringify(products, null, ' ')); 
        
        res.redirect('/products')
    }
   
}

module.exports = productController;