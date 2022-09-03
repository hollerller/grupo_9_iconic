module.exports = (sequelize,dataTypes) => {
    let alias = "Gender";
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
        tableNme: "genders",
        timestamps: false
    };
    const Gender = sequelize.define(alias,cols,config);
Gender.associate = (models) => {
    Gender.hasMany(models.Product, {
        as: "products",
        foreignKey: "gender_id"
    })
}
    return Gender
}