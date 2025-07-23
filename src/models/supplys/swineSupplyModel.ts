import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SwineSupply extends Model{
    get idSwineSupply(): number {
        return this.getDataValue("idSupplyBatch");
    }

    get quantity(): number {
        return this.getDataValue("quantity");
    }

};

SwineSupply.init(
    {
        idSwineSupply:{
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
        idSwineBatch : {
            type : DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'SwineBatch',
                key: 'idSwineBatch'
            }
        },
        quantity : {
            type : DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        generationDate : {
            type : DataTypes.DATE,
            allowNull : false
        },
        idUser : {
            type : DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'User',
                key: 'idUser'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineSupply',
        tableName: 'tblSwineSupplies',
        schema: 'supply'
    }
)

SwineSupply.sync();
export default SwineSupply;