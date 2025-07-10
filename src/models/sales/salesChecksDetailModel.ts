import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SalesChecksDetail extends Model {

    get idSalesCheckDetail(): number {
        return this.getDataValue("idSalesCheckDetail");
    }

    get idSalesCheck(): number {
        return this.getDataValue("idSalesCheck");
    }

    get idSwineCutType(): number {
        return this.getDataValue("idSwineCutType");
    }

    get quantity(): number {
        return this.getDataValue("quantity");
    }
}
SalesChecksDetail.init(
    {
        idSalesCheckDetail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idSalesCheck: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SalesCheck',
                key: 'idSalesCheck',
            },
        },
        idSwineCutType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SwineCutType',
                key: 'idSwinecutType',
            },
        },
        quantity: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SalesChecksDetail',
        tableName: 'tblSalesChecksDetails',
        schema: 'sales',
    }
);
SalesChecksDetail.sync();
export default SalesChecksDetail;