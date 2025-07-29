import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SupplyPurcharse extends Model {

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
    get idStatus(): number {
        return this.getDataValue("idStatus");
    }
}   

SupplyPurcharse.init(
    {
        idSupplyPurcharse: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        generationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        // entryDate : {
        //     type : DataTypes.DATE,
        // },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'idUser',
            },
        },
        subTotal: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        ISV: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        idProvider: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Provider',
                key: 'idProvider',
            },
        },
        idStatus : {
            type : DataTypes.INTEGER,
            references : {
                model : 'Status',
                key: 'idStatus'
            }
        },
        idFormerSupplyPurcharse : {
            type : DataTypes.INTEGER,
            references : {
                model : "SupplyPurcharse",
                key : "idSupplyPurcharse"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SupplyPurcharse',
        tableName: 'tblSupplyPurcharses',
        schema: 'orders',
    }
);
SupplyPurcharse.sync();
export default SupplyPurcharse;