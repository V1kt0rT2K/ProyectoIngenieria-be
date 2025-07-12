import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Vaccine extends Model{};

Vaccine.init(
    {
        idVaccine:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vaccineName:{
            type: DataTypes.STRING('MAX'),
            allowNull: false
        },
        idVaccineType:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "VaccineType",
                key: "idVaccineType"
            }
        },
        idStage:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Stage",
                key: "idStage"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Vaccine',
        tableName: 'tblVaccines',
        schema: 'supply'
    }
)

Vaccine.sync();
export default Vaccine;