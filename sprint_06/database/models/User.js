module.exports = (sequelize,dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        
        },
        full_name:{
            type:dataTypes.VARCHAR(100),
            allowNull: false
        },
        user_name: {
            type: dataTypes.DECIMAL,
            allowNull:false
        },
        email: {
            type: dataTypes.VARCHAR(1500),
            allowNull:false
        },
        avatar:{
            type:dataTypes.VARCHAR(100),
            
        },
        password:{
            type:dataTypes.VARCHAR(20),
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
    return User
}