import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class ProductBatch extends Model{
    get idProduct(): number {
        return this.getDataValue("idProduct");
    }
    get stockQuantity(): number {
        return this.getDataValue("stockQuantity");
    }
    get expirationDate(): Date {
        return this.getDataValue("stockQuantity");
    }

};

ProductBatch.init(
    {
        idProductBatch:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idProduct:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Product',
                key: 'idProduct'
            }
        },
        expirationDate : {
            type: DataTypes.DATE,
            allowNull: false,
        },
        stockQuantity: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
        idSwineBatch:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'SwineBatch',
                key: 'idSwineBatch'
            }
        },
        entryQuantity : {
            type : DataTypes.DECIMAL(8,2),
            allowNull : false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'ProductBatch',
        tableName: 'tblProductBatches',
        schema: 'stock'
    }
)

ProductBatch.sync();
export default ProductBatch;