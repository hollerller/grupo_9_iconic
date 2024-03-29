
module.exports = (sequelize,dataTypes) => {
    let alias = "Brand";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        name:{
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "brands",
        timestamps: false
    };
    const Brand = sequelize.define(alias,cols,config);

    Brand.associate = (models) => {
        Brand.hasMany(models.Product,{
            as:"products",
            foreignKey: "brand_id"
        })
    }
    return Brand
}