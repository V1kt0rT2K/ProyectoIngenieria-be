import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";
class userDataHistoric extends Model {}

userDataHistoric.init(
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
    modelName: 'userRolesHistoric',
    tableName: 'tblUserDataHistoric ',
    schema: 'users'
} 

);
userDataHistoric.sync();  
export default userDataHistoric;