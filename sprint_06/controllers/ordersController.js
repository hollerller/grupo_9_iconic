let db = require("../database/models");
const Order = require("../database/models/Order");


const ordersController = {

    mostrarBoton: (req,res) => {
        res.render("prueba");
    },

    processCart: (req, res) => {
        let userID = req.params.id;
        
        db.Order.create({
            order_status: 'PENDING',
            user_id: 1
        })
    }

}

module.exports = ordersController;