module.exports = (sequelize,dataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        name:{
            type:dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "categories",
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