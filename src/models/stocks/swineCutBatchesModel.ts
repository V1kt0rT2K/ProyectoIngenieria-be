import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';


class SwineCutBatches extends Model {

    get idAvaliableSwineCut(): number {
        return this.getDataValue("idAvaliableSwineCut");
    }

    get quantity(): number {
        return this.getDataValue("quantity");
    }
    get idSwinecutType(): number {
        return this.getDataValue("idSwinecutType");
    }
    get expirationDate(): Date {
        return this.getDataValue("expirationDate");
    }
    get isEmpty(): boolean {
        return this.getDataValue("isEmpty");
    }

}
SwineCutBatches.init(
    {
        idAvaliableSwineCut: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idSwinecutType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SwineCutType', 
                key: 'idSwinecutType', 
            },
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isEmpty: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineCutBatches',
        tableName: 'tblSwineCutBatches',
        schema: 'stock',
    },
);
SwineCutBatches.sync();
export default SwineCutBatches;