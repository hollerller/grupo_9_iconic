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
            type:dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull:false
        },
        description: {
            type: dataTypes.STRING(1500),

        },
        in_sale:{
            type:dataTypes.BOOLEAN,
            allowNull:false
        },
        discount:{
            type:dataTypes.TINYINT.UNSIGNED,

        },
        image:{
            type:dataTypes.STRING(100),

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
Product.associate = (models) => {

    Product.belongsTo(models.Size,{
        as: "sizes",
        foreignKey: "size_id"
    });

    Product.belongsTo(models.Category,{
        as: "categories",
        foreignKey: "category_id"
    });

    Product.belongsTo(models.Gender,{
        as: "genders",
        foreignKey: "gender_id"
    });

    Product.belongsTo(models.Brand,{
        as: "brands",
        foreignKey: "brand_id"
    })
}

    return Product
}