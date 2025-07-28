import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Product extends Model{
    get idProduct(): number {
        return this.getDataValue("idProduct");
    }
    get price(): number {
        return this.getDataValue("price");
    }

    get productName(): string {
        return this.getDataValue("productName");
    }

    get orderPoint(): number {
        return this.getDataValue("orderPoint");
    }

};

Product.init(
    {
        idProduct:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        },
        productDescription:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        orderPoint:{
            type:DataTypes.DECIMAL(8,2),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Product',
        tableName: 'tblProducts',
        schema: 'stock'
    }
)

Product.sync();
export default Product;