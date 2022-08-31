module.exports = (sequelize,dataTypes) => {
    let alias = "Country";
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
        tableNme: "products"
    };
    const Country = sequelize.define(alias,cols,config);
    return Country
}