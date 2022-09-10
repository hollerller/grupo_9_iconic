let db = require("../database/models");
const Order = require("../database/models/Order");


const ordersController = {

    processCart: (req, res) => {
       // let user = req.sesion.userLogged;


      //  db.Order.findAll().then(orders=>{
       //    res.send(orders)
      //  })

        db.Order.create({
            order_status: 'PENDING',
            user_id: 1
        })

            res.render('shoppingCart');

    }
    
}

module.exports = ordersController;