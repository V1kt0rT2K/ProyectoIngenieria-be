import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';
import {MAX} from 'mssql';
class CaiCodeCheck extends Model {

    get idCaiCodeCheck(): number {
        return this.getDataValue("idCaiCodeCheck");
    }

    get idCaiCode(): number {
        return this.getDataValue("idCaiCode");
    }
    get idSalesCheck(): number {
        return this.getDataValue("idSalesCheck");
    }
    get saleCheckCode(): string {
        return this.getDataValue("saleCheckCode");
    }
}
CaiCodeCheck.init(
    {
        idCaiCodeCheck: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idCaiCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CaiCode',
                key: 'idCaiCode',
            },
        },
        idSalesCheck: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SalesCheck',
                key: 'idSalesCheck',
            },
        },
        saleCheckCode: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'CaiCodeCheck',
        tableName: 'tblCaiCodeCheck',
        schema: 'sales',
    },
);
CaiCodeCheck.sync();
export default CaiCodeCheck;