import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class FeedBatche extends Model {

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
FeedBatche.init(
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
            type: DataTypes.INTEGER,
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
        modelName: 'FeedBatche',
        tableName: 'tblFeedBatches',
        schema: 'supply',
    },
);

FeedBatche.sync();
export default FeedBatche;