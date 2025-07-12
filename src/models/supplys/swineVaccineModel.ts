import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';



class SwineVaccine extends Model {

    get idSwineVaccine(): number {
        return this.getDataValue("idSwineVaccine");
    }

    get generationDate(): Date {
        return this.getDataValue("generationDate"); 
    }
    get idSwineBatch(): number {
        return this.getDataValue("idSwineBatch");
    }
    get quantityUsed(): number {
        return this.getDataValue("quantityUsed");
    }
    get idVaccineBatch(): number {
        return this.getDataValue("idVaccineBatch");
    }
    get idUser(): number {
        return this.getDataValue("idUser");
    }


}
SwineVaccine.init(
    {
        idSwineVaccine: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        generationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        idSwineBatch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SwineBatch',
                key: 'idSwineBatch',
            }
        },
        quantityUsed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idVaccineBatch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'VaccineBatch',
                key: 'idVaccineBatch',
            }
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'idUser',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineVaccine',
        tableName: 'tblSwineVaccine',
        schema: 'supply',
    },
);
SwineVaccine.sync();
export default SwineVaccine;