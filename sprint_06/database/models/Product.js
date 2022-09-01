module.exports = (sequelize,dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        name:{
            type:dataTypes.VARCHAR(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull:false
        },
        description: {
            type: dataTypes.VARCHAR(1500),

        },
        in_sale:{
            type:dataTypes.BOOLEAN,
            allowNull:false
        },
        discount:{
            type:dataTypes.TINYINT.UNSIGNED,

        },
        image:{
            type:dataTypes.VARCHAR(100),

        },
        size_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            
        },
        category_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false

        },
        gender_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false

        },
        brand_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false

        }
    };
    let config = {
        tableNme: "products",
        timestamps:false
    };
    const Product = sequelize.define(alias,cols,config);
    return Product
}