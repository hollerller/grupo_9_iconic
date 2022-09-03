module.exports = (sequelize,dataTypes) => {
    let alias = "OrderDetail";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        order_id:{
            type:dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        quantity: {
            type: dataTypes.INTEGER,

        }
    };
    let config = {
        tableNme: "order_detail"
    };
    const OrderDetail = sequelize.define(alias,cols,config);
    return OrderDetail
}