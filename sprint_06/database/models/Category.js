module.exports = (sequelize,dataTypes) => {
    let alias = "Category";
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
        }
    };
    let config = {
        tableNme: "categories",
        timestamps:false
    };
    const Category = sequelize.define(alias,cols,config);

   Category.associate = (models) => {
    Category.hasMany(models.Product,{
        as: "products",
        foreignKey: "category_id"
    })
   }
    return Category
}