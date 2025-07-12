import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class FeedBatch extends Model {

    get idFeedBatch(): number {
        return this.getDataValue("idFeedBatch");
    }
    get idFeed(): number {
        return this.getDataValue("idFeed");
    }
    get quantity(): number {
        return this.getDataValue("quantity");
    }
    get expirationDate(): Date {
        return this.getDataValue("expirationDate");
    }
}
FeedBatch.init(
    {
        idFeedBatch: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idFeed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Feed',
                key: 'idFeed',
            },
        },
        quantity: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'FeedBatch',
        tableName: 'tblFeedBatches',
        schema: 'supply',
    },
);

FeedBatch.sync();
export default FeedBatch;