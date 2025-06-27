import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";
import userModel from "./userModel";
import userRolModel from "./userRolModel";
import User from "./userModel";
import UserRol from "./userRolModel";
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
    oldRoleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userRolModel',
            key: 'idRole'
        }
    },
    newRoleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userRolModel',
            key: 'idRole'
        }
    },
    generationDate:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
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
//UserRolesHistoric.hasOne(userModel);
//UserRolesHistoric.hasOne(userRolModel);

UserRolesHistoric.belongsTo(User, { foreignKey: 'idUser' });
UserRolesHistoric.belongsTo(UserRol, { as: 'OldRole', foreignKey: 'oldRoleId' });
UserRolesHistoric.belongsTo(UserRol, { as: 'NewRole', foreignKey: 'newRoleId' });


UserRolesHistoric.sync();  
export default UserRolesHistoric;