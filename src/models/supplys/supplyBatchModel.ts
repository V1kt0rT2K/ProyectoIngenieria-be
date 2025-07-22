import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyBatch extends Model{
    get idSupplyBatch(): number {
        return this.getDataValue("idSupplyBatch");
    }

    get quantity(): number {
        return this.getDataValue("quantity");
    }

};

SupplyBatch.init(
    {
        idSupplyBatch:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idSupply : {
            type : DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'Supply',
                key: 'idSupply'
            }
        },
        quantity : {
            type : DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        expirationDate : {
            type : DataTypes.DATE,
            allowNull : false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SupplyBatch',
        tableName: 'tblSupplyBatches',
        schema: 'supply'
    }
)

SupplyBatch.sync();
export default SupplyBatch;