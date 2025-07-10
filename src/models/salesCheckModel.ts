import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';

class SalesCheck extends Model {

    get idSalesCheck(): number {
        return this.getDataValue("idSalesCheck");
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
    get idClient(): number {
        return this.getDataValue("idClient");
    }
}   
SalesCheck.init(
    {
        idSalesCheck: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        generationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'idUser',
            },
        },
        subtotal: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        ISV: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Client',
                key: 'idClient',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SalesCheck',
        tableName: 'tblSalesCheck',
        schema: 'sales',
    }
);
SalesCheck.sync();
export default SalesCheck;