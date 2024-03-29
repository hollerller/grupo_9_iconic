module.exports = (sequelize,dataTypes) => {
    let alias = "Role";
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
        tableName: "roles",
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