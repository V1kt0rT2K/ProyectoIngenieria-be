import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyType extends Model{
    get idSupplyType(): number {
        return this.getDataValue("idSupplyType");
    }

    get nameSupplyType(): string {
        return this.getDataValue("nameSupplyType");
    }

};

SupplyType.init(
    {
        idSupplyType:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nameSupplyType:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SupplyType',
        tableName: 'tblSupplyTypes',
        schema: 'supply'
    }
)

SupplyType.sync();
export default SupplyType;