import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";
import userModel from "./userModel";
import userRolModel from "./userRolModel";
class UserRolesHistoric extends Model {}

UserRolesHistoric.init(
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
            model: 'userModel',
            key: 'idUser'
        }
    },
    idRole:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userRolModel',
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
    modelName: 'UserRolesHistoric',
    tableName: 'tblUserRolesHistoric',
    schema: 'users'
}
);
UserRolesHistoric.hasOne(userModel);
UserRolesHistoric.hasOne(userRolModel);
UserRolesHistoric.sync();  
export default UserRolesHistoric;