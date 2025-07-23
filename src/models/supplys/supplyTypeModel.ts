import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyType extends Model{
    get idSupplyType(): number {
        return this.getDataValue("idSupplyType");
    }

    get supplyTypeName(): string {
        return this.getDataValue("supplyTypeName");
    }

};

SupplyType.init(
    {
        idSupplyType:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        supplyTypeName:{
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