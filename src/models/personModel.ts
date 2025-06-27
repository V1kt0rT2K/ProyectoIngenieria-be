import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";
import User from "./userModel";

class Person extends Model {
    get idPerson(): number {
        return this.getDataValue("idPerson");
    }
}

Person.init(
    {
        idPerson: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        identityNumber: {
            type: DataTypes.STRING(13),
            unique: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false
        },
        secondName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false
        },
        secondLastName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false
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