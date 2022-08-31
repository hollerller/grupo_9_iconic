module.exports = (sequelize,dataTypes) => {
    let alias = "Gender";
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
        tableNme: "genders",
        timestamps: false
    };
    const Gender = sequelize.define(alias,cols,config);
    return Gender
}