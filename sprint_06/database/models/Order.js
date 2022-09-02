module.exports = (sequelize,dataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        date:{
            type:dataTypes.Date,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL,
            allowNull:false
        },
        status: {
            type: dataTypes.VARCHAR(1500),

        },
        order_adress:{
            type:dataTypes.VARCHAR(100),
            
        },
        user_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        cellphone:{
            type:dataTypes.INTEGER(20),
            
        }
    };
    let config = {
        tableNme: "orders",
        timestamps:false
    };
    const Order = sequelize.define(alias,cols,config);

    Order.associate = (models) => {
        Order.belongsTo(models.User,{
            as:"users",
            foreignKey:"user_id"
        })
    }
    return Order
}