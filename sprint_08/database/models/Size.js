module.exports = (sequelize,dataTypes) => {
    let alias = "Size";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        name:{
            type:dataTypes.STRING(10),
            allowNull: false
        }
    };
    let config = {
        tableName: "sizes",
        timestamps: false
    };
    const Size = sequelize.define(alias,cols,config);

    Size.associate = (models) => {
        Size.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'size_id'
        })
    }
    return Size
}