module.exports = (sequelize,dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        full_name:{
            type:dataTypes.STRING(100),
            allowNull: false
        },
        user_name: {
            type: dataTypes.DECIMAL,
            allowNull:false
        },
        email: {
            type: dataTypes.STRING(1500),
            allowNull:false
        },
        avatar:{
            type:dataTypes.STRING(100),
            
        },
        password:{
            type:dataTypes.STRING(20),
            allowNull:false
        },
        birthday:{
            type:dataTypes.DATE,

        },
        role_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        country_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false

        }
    };
    let config = {
        tableNme: "users",
        timestamps:false
    };
    const User = sequelize.define(alias,cols,config);

    User.associate = (models) => {
        User.belongsTo(models.Role,{
            as: "roles",
            foreignKey:"role_id"
        });

        User.belongsTo(models.Country,{
            as: "countries",
            foreignKey:"country_id"
        });

        User.hasMany(models.Order,{
            as:"orders",
            foreignKey:"user_id"
        })
    }
    return User
}