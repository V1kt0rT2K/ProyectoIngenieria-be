import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';

class VaccineBatch extends Model {};

VaccineBatch.init(
    {
        idVaccineBatch:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idVaccine:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Vaccine",
                key: "idVaccine"
            }
        },
        expirationDate:{
            type: DataTypes.DATE,
            allowNull: false
        },
        isEmpty:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'VaccineBatch',
        tableName: 'tblVaccineBatches',
        schema: 'supply'
    }
)

VaccineBatch.sync();
export default VaccineBatch;