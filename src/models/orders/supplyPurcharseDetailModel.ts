import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyPurcharseDetail extends Model {

    get idSupplyPurcharseDetail(): number {
        return this.getDataValue("idSupplyPurcharseDetail");
    }
    get idSupplyPurcharse(): number {
        return this.getDataValue("idSupplyPurcharse");
    }
    get idSupply(): number {
        return this.getDataValue("idSupply")
    }
    get quantity(): number {
        return this.getDataValue("quantity");
    }
}   

SupplyPurcharseDetail.init(
    {
        idSupplyPurcharseDetail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idSupplyPurcharse: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: "SupplyPurcharse",
                key : "idSupplyPurcharse"
            }
        },
        idSupply: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: "Supply",
                key : "idSupply"
            }
        },
        quantity : {
            type : DataTypes.DECIMAL(8,2),
            allowNull : false,

        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SupplyPurcharseDetail',
        tableName: 'tblSupplyPurcharseDetails',
        schema: 'orders',
    }
);
SupplyPurcharseDetail.sync();
export default SupplyPurcharseDetail;