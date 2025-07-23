import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Status extends Model {
    get idStatus(): number {
        return this.getDataValue("idStatus");
    }
    
    get statusName(): string {
        return this.getDataValue("statusName");
    }
}

Status.init(
  {
    idStatus: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    statusName: {
      type: DataTypes.STRING('MAX'),
      allowNull: false,
    },
    statusDescription: {
      type: DataTypes.STRING('MAX'),
      allowNull: false,
    },
    idStatusType:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model:"StatusType",
        key:"idStatusType"
      }
    }
  },
  {
    sequelize, 
    timestamps: false,
    modelName: 'Status', 
    tableName: 'tblStatus',
    schema : 'asset'
  },
);

Status.sync();

export default Status;