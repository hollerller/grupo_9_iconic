const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
let db = require("../database/models");
const { Op } = require("sequelize");
const { sequelize } = require('../database/models');




const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
    //rutas GET//
    list: (request, response) => {
        db.Product.findAll()
            .then(products=>{
                response.render('products',{products:products})
                //console.log(products);
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
                res.render('productDetail', {product:product,
                user: req.session.userLogged}
                )
            })
       // console.log(req.session.userLogged);
        
    },
    //Crear productos: GET//
    createProduct: (req,res) => {
      let sizes = db.Size.findAll();
      let genders = db.Gender.findAll();
      let brands = db.Brand.findAll();
      let categories = db.Category.findAll();


      Promise.all([sizes,genders,brands,categories])
        .then(function([sizes,genders,brands,categories]){
            res.render('createProducts',{
                sizes:sizes,
                genders:genders,
                brands:brands,
                categories:categories
            })
        })
    
    },
    //Crear productos: POST//
    store: (req,res)=>{
        let errores = validationResult(req);

        //pedidos asincronicos//
        let sizes = db.Size.findAll();
        let genders = db.Gender.findAll();
        let brands = db.Brand.findAll();
        let categories = db.Category.findAll();
        
       
        if(errores.isEmpty()){
    
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
            res.redirect('/')

        }else{
            //console.log(errores.mapped());
            Promise.all([sizes,genders,brands,categories])
                .then(function([sizes,genders,brands,categories]){
                    res.render('createProducts', { 
                        errorsMessage : errores.mapped(),
                        oldData: req.body,
                        sizes:sizes,
                        genders:genders,
                        brands:brands,
                        categories:categories
                    })
                })
            }
},
//Editar productos: GET//
    editProduct: (req,res) => {
        //pedidos asincrónicos//
        let product = db.Product.findByPk(req.params.id);
        let sizes = db.Size.findAll();
        let genders = db.Gender.findAll();
        let brands = db.Brand.findAll();
        let categories = db.Category.findAll();

      Promise.all([product,sizes,genders,brands,categories])
        .then(([product,sizes,genders,brands,categories])=>{
            res.render('editProducts',{
                oldData: product,
                product: req.params.id,
                sizes:sizes,
                genders:genders,
                categories:categories,
                brands:brands
            })
        })

    },
    //Editar productos: PUT//
    saveChanges: (req,res) =>{
        let idUrl = req.params.id;
    //   console.log(idUrl);
        let errores = validationResult(req);
        let product = db.Product.findByPk(idUrl);
        let sizes = db.Size.findAll();
        let genders = db.Gender.findAll();
        let brands = db.Brand.findAll();
        let categories = db.Category.findAll();

        if(errores.isEmpty()){
            db.Product.update({
                name:req.body.prodName,
                price:req.body.price,
                description:req.body.description,
                in_sale:req.body.inSale,
                discount:req.body.discount,
                //image:req.file.filename,
                size_id:req.body.size,
                category_id:req.body.category,
                gender_id:req.body.gender,
                brand_id:req.body.brand
            },{
                where:{
                    id:idUrl
                }
            })
            res.redirect('/')
        }  else {

            Promise.all([sizes,genders, brands, categories, product])
                .then(function([sizes, genders, brands, categories, product]){
                    res.render('editProducts', { 
                        errorsMessage : errores.mapped(),
                        oldData: product,
                        sizes:sizes,
                        genders:genders,
                        brands:brands,
                        categories:categories,
                        product: req.params.id
                    })
                })
        //res.redirect(`/products/${idUrl}`)
        }
    },
 
    //ruta DELETE
    delete:(req,res)=>{
        let idUrl = req.params.id;

       db.Product.destroy({
        where:{
            id: idUrl
        }
       })
        res.redirect('/products')
    }, 

    apiList: async (req,res)=>{

        let groupCategories = await db.Product.findAll({
            include: [
                 "product_categories"
                ],
            group: ['category_id'],
            attributes: ['category_id', [sequelize.fn('COUNT', 'category_id'), 'count']],
            order: [
                ['count', 'DESC']
            ]
        })


        let result = {};

        groupCategories.forEach(element => {
            result[element.product_categories.dataValues.name] = element.dataValues.count
        });
        let orders = await db.Order.findAll({
            include:['products']
        });
        
        
        let products = await db.Product.findAll({
          include:['orders']
        });

        // console.log(orderDetail[0].dataValues.product_id)
        let arrayProducts = [];
           
           for (i = 0;i< products.length;i++){
            let orderDetail = await db.OrderDetail.findAll({
                // include:['orders','products'],
                where:{
                    product_id: products[i].id
                }
        
            });
          
            arrayProducts.push(
                {id: products[i].dataValues.id,
                name:  products[i].dataValues.name,
                description:  products[i].dataValues.description,
                orders: orderDetail[0],
                image: "http://localhost:3001/images/products/" + products[i].image,
                detail: 'http://localhost:3001/products/api/products/' + products[i].dataValues.id
               
            })
         
           }
           
            return res.json({
                total: products.length,
                countByCategory: result,
                products:arrayProducts
            })
    
    },

    productDetail: async (req,res)=>{

        let product = await db.Product.findByPk( req.params.id ,{ 
            include: [
            {association: "product_sizes"},
            {association: "product_categories"},
            {association: "product_genders"},
            {association: "product_brands"}
        
        ]      
    })
        
            return res.status(200).json(
                {
                    
                    name: product.id,
                    price: product.price,
                    description: product.description,
                    in_sale: product.in_sale,
                    discount: product.discount,
                    image: "http://localhost:3001/images/products/" + product.image,
                    size_id: product.product_sizes.dataValues.name,
                    category_id: product.product_categories.dataValues.name,
                    gender_id: product.product_genders.dataValues.name,
                    brand_id: product.product_brands.dataValues.name
                }
                );
      

    }, 

    search: (req, res) => {
        let key = req.body.busqueda;
        db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: key
                }
            }, 
            include:[
                {association: "product_sizes"},
                {association: "product_categories"},
                {association:"product_genders"},
                {association:"product_brands"}
            ]
        })
            .then(product =>{
                res.render('products',{products:product})
            })
    }

   
   
}

module.exports = productController;