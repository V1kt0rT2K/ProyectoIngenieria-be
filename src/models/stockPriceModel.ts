import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';

class StockPrice extends Model {

    get idStockPrice(): number {
        return this.getDataValue("idStockPrice");
    }
    get idSwinecutType(): number {
        return this.getDataValue("idSwinecutType");
    }
    get priceUnit(): number {
        return this.getDataValue("priceUnit");
    }

}
StockPrice.init(
    {
        idStockPrice: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idSwinecutType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SwineCutType',
                key: 'idSwinecutType',
            },
        },
        priceUnit: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'StockPrice',
        tableName: 'tblStockPrices',
        schema: 'sales',
    },
);
StockPrice.sync();
export default StockPrice;