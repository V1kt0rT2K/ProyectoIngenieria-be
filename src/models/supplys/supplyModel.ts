import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Supply extends Model{
    get idSupply(): number {
        return this.getDataValue("idSupply");
    }

    get nameSupply(): string {
        return this.getDataValue("nameSupply");
    }

    get price(): number {
        return this.getDataValue("price");
    }

};

Supply.init(
    {
        idSupply:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nameSupply:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        },
        idStage : {
            type : DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'Stage',
                key: 'idStage'
            }
        },
        idSupplyType : {
            type : DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'SupplyType',
                key: 'idSupplyType'
            }
        },
        orderPoint : {
            type : DataTypes.DECIMAL(8,2),
            allowNull : false
        },
        price : {
            type : DataTypes.DECIMAL(8,2),
            allowNull : false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Supply',
        tableName: 'tblSupplies',
        schema: 'supply'
    }
)

Supply.sync();
export default Supply;