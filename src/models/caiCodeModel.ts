import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';
import {MAX} from 'mssql';
class CaiCode extends Model {

    get idCaiCode(): number {
        return this.getDataValue("idCaiCode");
    }

    get code(): string {
        return this.getDataValue("code");
    }
    get establishmentRTN(): string {
        return this.getDataValue("establishmentRTN");
    }
}
CaiCode.init(
    {
        idCaiCode: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
        establishmentRTN: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'CaiCode',
        tableName: 'tblCaiCode',
        schema: 'sales',
    },
);
CaiCode.sync();
export default CaiCode;