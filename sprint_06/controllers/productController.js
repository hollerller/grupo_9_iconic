const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
let db = require("../database/models");
const { create } = require('domain');
const Product = require('../database/models/Product');


const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
    //rutas GET//
    list: (request, response) => {
        db.Product.findAll()
            .then(products=>{
                response.render('products',{products:products})
            })

    },
    productID: (req, res) => {

        db.Product.findByPk(req.params.id,{
            include:[
                {association: "product_sizes"},
                {association: "product_categories"},
                {association:"product_genders"},
                {association:"product_brands"}
            ]
        })
            .then(product =>{
                res.render('productDetail', {product:product})
            })
        
        
    },
    //Crear productos: GET//
    createProduct: (req,res) => {
      let sizes = db.Size.findAll();
      let genders = db.Gender.findAll();
      let brands = db.Brand.findAll();
      let categories = db.Category.findAll();


      Promise.all([sizes,genders,brands,categories])
        .then(function([sizes,genders,brands,categories]){
            res.render('createProducts',{sizes:sizes,genders:genders,brands:brands,categories:categories})
        })
    
    },
    //Crear productos: POST//
    store: (req,res)=>{
        let errores = validationResult(req);
        
        let file = req.file;
        if(file && errores.isEmpty()){
    
            db.Product.create({
                name:req.body.prodName,
                price:req.body.price,
                description:req.body.description,
                in_sale:req.body.inSale,
                discount:req.body.discount,
                image:req.file.filename,
                size_id:req.body.size,
                category_id:req.body.category,
                gender_id:req.body.gender,
                brand_id:req.body.brand
            })
        }  
        res.redirect('/products')
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