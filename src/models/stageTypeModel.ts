import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';
import { MAX } from 'mssql';

class StageType extends Model{};

StageType.init(
    {
        idStageType:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stageTypeName:{
            type: DataTypes.STRING(MAX),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(MAX),
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'StageType',
        tableName: 'tblStageTypes',
        schema: 'asset'
    }
)

StageType.sync();
export default StageType;