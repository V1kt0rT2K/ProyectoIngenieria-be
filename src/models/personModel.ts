import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";

class Person extends Model {
    get idPerson(): number {
        return this.getDataValue("idPerson");
    }
    get firstName(): string {
        return this.getDataValue("firstName");
    }
    get secondName(): string {
        return this.getDataValue("secondName");
    }
    get lastName(): string {
        return this.getDataValue("lastName");
    }
    get secondLastName(): string {
        return this.getDataValue("secondLastName");
    }
    get fullName(): string {
        return [this.firstName,this.secondName,this.lastName,this.secondLastName].join(' ');
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
        },
        fullName: {
        type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.secondName} ${this.lastName} ${this.secondLastName}`;
            }
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