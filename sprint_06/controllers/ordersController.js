let db = require("../database/models");
const Order = require("../database/models/Order");


const ordersController = {

    processCart: (req, res) => {
        //let user = req.sesion.userLogged;
        db.Order.findAll().then(orders=>{
           res.send(orders)
        })

            

    }
    
}

module.exports = ordersController;