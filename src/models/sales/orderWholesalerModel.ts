import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class OrderWholesaler extends Model {
}

OrderWholesaler.init(
    {
        idOrderWholesaler: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Client',
                key: 'idClient',
            },
        },
        idStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Status',
                key: 'idStatus',
            },
        },
        subTotal: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        ISV: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        generationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'OrderWholesaler',
        tableName: 'tblordersWholesaler',
        schema: 'sales',
    }
);

OrderWholesaler.sync();
export default OrderWholesaler;
