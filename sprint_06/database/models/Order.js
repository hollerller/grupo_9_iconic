module.exports = (sequelize,dataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        date:{
            type:dataTypes.DATE,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL,
            allowNull:false
        },
        status: {
            type: dataTypes.STRING(1500),

        },
        order_adress:{
            type:dataTypes.STRING(100),
            
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