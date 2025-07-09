import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';
import { MAX } from 'mssql';

class VaccineType extends Model {

    get idVaccineType(): number {
        return this.getDataValue("idVaccineType");
    }

    get vaccineName(): string {
        return this.getDataValue("vaccineName");
    }

    get description(): string {
        return this.getDataValue("description");
    }


}
VaccineType.init(
    {
        idVaccineType: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vaccineName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'VaccineType',
        tableName: 'tblVaccineType',
        schema: 'asset',
        indexes: [
            {
                unique: true,
                fields: ['vaccineName'],
            },
        ],
    },
);
VaccineType.sync();
export default VaccineType;
