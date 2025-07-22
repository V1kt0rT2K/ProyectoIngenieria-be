import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyPurcharseDetail extends Model {

    get idSupplyPurcharse(): number {
        return this.getDataValue("idSupplyPurcharse");
    }
    get generationDate(): Date {
        return this.getDataValue("generationDate"); 
    }
    get idUser(): number {
        return this.getDataValue("idUser");
    }
    get subtotal(): number {
        return this.getDataValue("subtotal");
    }
    get ISV(): number {
        return this.getDataValue("ISV");
    }
    get idProvider(): number {
        return this.getDataValue("idProvider");
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