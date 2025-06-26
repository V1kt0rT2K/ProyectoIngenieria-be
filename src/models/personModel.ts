import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";

class Person extends Model {}

Person.init(
    {
    idPerson:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    identityNumber:{
        type: DataTypes.STRING(13),
        unique: true,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING('MAX'),
        allowNull: false
    },
    secondName :{
        type: DataTypes.STRING('MAX'),
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING('MAX'),
        allowNull: false
    },
    secondLastName:{
        type: DataTypes.STRING('MAX'),
        allowNull: true
    }
},
{
    sequelize,
    timestamps: false,
    modelName: 'Person',
    tableName: 'tblPersons',
    schema: 'users'
}

);
Person.sync();  
export default Person;