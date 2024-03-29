const e = require("express");
let db = require("../database/models");
const { productID } = require("./productController");
const {Op} = require("sequelize")


const ordersController = {

    processCart: (req, res) => {
       let user = req.session.userLogged;
      // console.log(user.id, "test /")
      //Busca las ordenes actuales
       db.Order.findAll()
       .then(orders=> {
        // Busco si ya hay una orden de ese usuario y en estado Pending
        let orderID = orders.find(item => (item.user_id == user.id && item.order_status == 'PENDING'))
        // Si ya hay una orden y esta en pending
        if (orderID != undefined){
            db.OrderDetail.create({
                order_id: orderID.id,
                product_id: req.params.id,
                quantity: req.body.cantidad
            })
        } else { 
            //si no esta creada una orden o esta en estado diferente a pending
            //crea la orden
            db.Order.create({
                order_status: 'PENDING',
                user_id: user.id
            }).then(newOrderID => { //Crea el detalle de la orden con ese order_id que acabamos de crear
                db.OrderDetail.create({
                    order_id: newOrderID.id,
                    product_id: req.params.id,
                    quantity: req.body.cantidad
                })
            })
     }

    })

    //pedidos asincróncos//
    let order = db.Order.findOne({
         where:{
            [Op.and]: 
                    [
                        { user_id: user.id },
                        { order_status: 'PENDING' }
                    ]
         }
        ,
        include: ["products"]
    })
 
    
    // .then(order=>{
    //     console.log(order.products[0].dataValues)
    // })
    let sizes = db.Size.findAll();
    let genders = db.Gender.findAll();
    let brands = db.Brand.findAll();
    let categories = db.Category.findAll();
    let products = db.Product.findAll();
   
    // let product = db.Product.findByPk(req.params.id)

    Promise.all([order,sizes,genders,brands,categories,products])
    .then(function([order,sizes,genders,brands,categories,products]){

        console.log(order.products[0].dataValues.order_detail.dataValues.id)
        res.render("shoppingCart", { 
            order:order,
            sizes:sizes,
            brands:brands,
            genders:genders,
            categories:categories,
            products:products
        })
    })
     
}
}
        ;

module.exports = ordersController;

