module.exports = (sequelize,DataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            allowNull: false,
            primaryKey: true

        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull:false
        },
        description: {
            type: DataTypes.VARCHAR(1500),

        },
        in_sale:{
            type:DataTypes.VARCHAR(3),
            
        },
        discount:{
            type:DataTypes.TINYIN5.UNSIGNED,

        },
        image:{
            type:DataTypes.VARCHAR(100),

        },
        size_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            
        },
        category_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false

        },
        gender_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false

        },
        brand_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false

        }
    };
    let config = {
        tableNme: "products",
        timestamps: true
    };
    const Product = sequelize.define(alias,cols,config);
    return Product
}