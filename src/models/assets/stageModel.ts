import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import { MAX } from 'mssql';

class Stage extends Model {
    get idStage(): number {
        return this.getDataValue("idStage");
    }
    
    get stageName(): string {
        return this.getDataValue("stageName");
    }
    
    get description(): string {
        return this.getDataValue("stageDescription");
    }
    get idStageType(): number {
        return this.getDataValue("idStageType");
    }
}
Stage.init(
    {
        idStage: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        stageName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        stageDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        idStageType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "StageType",
                key: "idStageType",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Stage',
        tableName: 'tblStages',
        schema: 'asset',
        
    },
);
Stage.sync();
export default Stage;