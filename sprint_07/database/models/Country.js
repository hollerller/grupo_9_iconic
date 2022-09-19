module.exports = (sequelize,dataTypes) => {
    let alias = "Country";
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
        tableName: "country",
        timestamps: false
    };
    const Country = sequelize.define(alias,cols,config);

    Country.associate = (models) => {
        Country.hasMany(models.User,{
            as: "users",
            foreignKey: "country_id"
        })
    }
    return Country
}