import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import User from '../users/userModel';

class SwineFeed extends Model {

    get idSwineFeed(): number {
        return this.getDataValue("idSwineFeed");
    }
    get generationDate(): Date {
        return this.getDataValue("generationDate");
    }
    get quantityUsed(): number {
        return this.getDataValue("quantityUsed");
    }

    get idSwineBatch(): number {
        return this.getDataValue("idSwineBatch");
    }

    get idFeedBatch(): number {
        return this.getDataValue("idFeedBatch");
    }

    get idUser(): number {
        return this.getDataValue("idUser");
    }
}
SwineFeed.init(
    {
        idSwineFeed: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        generationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantityUsed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idSwineBatch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SwineBatch',
                key: 'idSwineBatch',
            },
        },
        idFeedBatch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'FeedBatch',
                key: 'idFeedBatch',
            },
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: 'idUser',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineFeed',
        tableName: 'tblSwineFeed',
        schema: 'supply',
    },
);
SwineFeed.sync();
export default SwineFeed;