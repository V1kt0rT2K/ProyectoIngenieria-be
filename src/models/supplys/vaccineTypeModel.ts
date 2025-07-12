import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class VaccineType extends Model {

    get idVaccineType(): number {
        return this.getDataValue("idVaccineType");
    }

    get vaccineTypeName(): string {
        return this.getDataValue("vaccineTypeName");
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
        vaccineTypeName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'VaccineType',
        tableName: 'tblVaccineTypes',
        schema: 'supply',
    
    },
);
VaccineType.sync();
export default VaccineType;
