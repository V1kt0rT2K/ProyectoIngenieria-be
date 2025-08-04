import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyBatch extends Model{
    get idSupplyBatch(): number {
        return this.getDataValue("idSupplyBatch");
    }

    get stockQuantity(): number {
        return this.getDataValue("stockQuantity");
    }
    get idSupply(): number {
        return this.getDataValue("idSupply");
    }
    get expirationDate(): Date {
        return this.getDataValue("expirationDate");
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
        stockQuantity : {
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