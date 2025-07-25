import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import CaiCode from './caiCodeModel';

class CaiCodeRange extends Model {

    get idCaiCodeRange(): number {
        return this.getDataValue("idCaiCodeRange");
    }
    get idCaiCode(): number {
        return this.getDataValue("idCaiCode");
    }

    get startRange(): string {
        return this.getDataValue("startRange");
    }

    get endRange(): string {
        return this.getDataValue("endRange");
    }
    get expirationDate(): Date {
        return this.getDataValue("expirationDate");
    }   
    get isActive(): boolean {
        return this.getDataValue("isActive");
    }
    // get CaiCode(): CaiCode {
    //     console.log(this.CaiCode)
    //     return this.CaiCode;
    // }
}
CaiCodeRange.init(
    {
        idCaiCodeRange: {
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
        startRange: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        endRange: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'CaiCodeRange',
        tableName: 'tblCaiCodeRanges',
        schema: 'sales',
    },
);
CaiCodeRange.sync();
export default CaiCodeRange;
