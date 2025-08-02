import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class OrderWholesalerDetails extends Model {
}

OrderWholesalerDetails.init(
    {
        idOrderWholesalerDetail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idOrderWholesaler: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'OrderWholesaler',
                key: 'idOrderWholesaler',
            },
        },
        idProduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'idProduct'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'OrderWholesalerDetails',
        tableName: 'tblordersWholesalerDetails',
        schema: 'sales',
    }
);

OrderWholesalerDetails.sync();
export default OrderWholesalerDetails;
