module.exports = (sequelize,dataTypes) => {
    let alias = "Role";
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
        tableNme: "products",
        timestamps:false
    };
    const Role = sequelize.define(alias,cols,config);

    Role.associaton = (models) => {
        Role.hasMany(models.User,{
            as:"users",
            foreignKey:"role_id"
        })
    }
    return Role
}