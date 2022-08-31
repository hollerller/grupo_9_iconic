module.exports = (sequelize,dataTypes) => {
    let alias = "Brand";
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
        tableNme: "brands"
    };
    const Brand = sequelize.define(alias,cols,config);
    return Brand
}