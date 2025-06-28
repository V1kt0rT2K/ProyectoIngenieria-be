import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";
import userModel from "./userModel";
class UserDataHistoric extends Model {}

UserDataHistoric.init(
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
    job:{
        type: DataTypes.STRING('MAX'),
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING('MAX'),
        allowNull:false
    },
    secondName: {
        type: DataTypes.STRING('MAX'),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING('MAX'),
        allowNull: false
    },
    identityNumber: {
        type: DataTypes.STRING('MAX'),
        allowNull: false },
    modificationDate: {
        type: DataTypes.DATE }

},
{
    sequelize,
    timestamps: false,
    modelName: 'UserDataHistoric',
    tableName: 'tblUserDataHistoric',
    schema: 'users'
} 

);
UserDataHistoric.hasOne(userModel);
UserDataHistoric.sync();  
export default UserDataHistoric;