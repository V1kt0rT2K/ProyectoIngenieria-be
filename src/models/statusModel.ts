import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';

class Status extends Model {}

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