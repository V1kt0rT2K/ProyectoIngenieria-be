import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";
class userRolesHistoric extends Model {}

userRolesHistoric.init(
    {
    idUserHistoric:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUser:{
        type: DataTypes.INTEGER,
        allowNull:  false,
        references: {
            model: 'tblUsers',
            key: 'idUser'
        }
    },
    idRole:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tblUserRoles',
            key: 'idRole'
        }
    },
    generationDate:{
        type: DataTypes.DATE,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING('MAX'),
        
    }
},
{
    sequelize,
    timestamps: false,
    modelName: 'userRolesHistoric',
    tableName: 'tblUserRolesHistoric',
    schema: 'users'
}
);
userRolesHistoric.sync();  
export default userRolesHistoric;