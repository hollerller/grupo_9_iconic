//const e = require("express");
let db = require("../database/models");
const { productID } = require("./productController");
const { Op } = require("sequelize");
const OrderDetail = require("../database/models/OrderDetail");
const Order = require("../database/models/Order");


const ordersController = {

    showCart: async(req,res) =>{
        let user = req.session.userLogged;
        let order= await db.Order.findOne({
            where:{
               [Op.and]: 
                       [
                           { user_id: user.id },
                           { order_status: 'PENDING' }
                       ]
            }
        })
       if(order){
        let orderDetail = await db.OrderDetail.findAll({
            include: [
                {association: "products"}
                ],
                where: {
                    order_id: order.id
                }
           })
        let productsList = [];
           for (i = 0;i< orderDetail.length;i++){
               productsList.push(orderDetail[i].products)
           }
           res.render("shoppingCart",{
            user:user,
            orderDetail : orderDetail,
            productsList: productsList
        })
       }else{
        res.redirect("/products")
       }


       
      
    
    },

    processCart: async (req, res) => {
      //guardamos la informacion del usuario logeado//

        let user = req.session.userLogged;
      ///// ------ LOGICA PARA CREAR ORDENES Y DETALLE DE ORDENES --------- \\\\\\
      
      //Busca las ordenes actuales
    let ordersList = []
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
            .then(order => {
               
               console.log(order.dataValues)
            })
            res.redirect('/cart/checkout')
        } else { 
            //si no esta creada una orden o esta en estado diferente a pending
            //crea la orden
            db.Order.create({
                order_status: 'PENDING',
                user_id: user.id
            })
            .then(newOrderID => { //Crea el detalle de la orden con ese order_id que acabamos de crear
                db.OrderDetail.create({
                    order_id: newOrderID.id,
                    product_id: req.params.id,
                    quantity: req.body.cantidad
                })
            })
            // .then(order => {
            //     console.log(order);
            // })
     }

    })




    
}
}
        ;

module.exports = ordersController;

