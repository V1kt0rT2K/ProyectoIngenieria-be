import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import { MAX } from 'mssql';

class Feed extends Model {
    get idFeed(): number {
        return this.getDataValue("idFeed");
    }

    get feedName(): string {
        return this.getDataValue("feedName");
    }

    get idStage(): number {
        return this.getDataValue("idStage");
    }
}
Feed.init(
    {
        idFeed: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        feedName: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
        idStage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Stage",
                key: "idStage",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Feed',
        tableName: 'tblFeed',
        schema: 'stock',
    },
);
Feed.sync();
export default Feed;