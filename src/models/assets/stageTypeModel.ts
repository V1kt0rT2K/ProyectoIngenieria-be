import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
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
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(255),
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