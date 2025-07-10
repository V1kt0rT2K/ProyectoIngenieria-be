import { DataTypes, Model } from 'sequelize';
import sequelize from "../utils/connection";
import { MAX } from "mssql";

class StatusType extends Model{};

StatusType.init(
    {
        idStatusType:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        statusTypeName:{
            type: DataTypes.STRING(MAX),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'StatusType',
        tableName: 'tblStatusTypes',
        schema: 'asset',
    }
)

StatusType.sync();
export default StatusType;