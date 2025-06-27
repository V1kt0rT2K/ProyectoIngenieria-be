import {Sequelize, DataTypes, Model} from 'sequelize';
import sequelize from '../utils/connection';
import { MAX } from 'mssql';
import UserRequest from './userRequestModel';

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
    // Other model options go here
    sequelize, 
    timestamps: false,
    modelName: 'Status', 
    tableName: 'tblStatus',
    schema : 'asset'
  },
);

Status.hasMany(UserRequest, { foreignKey: 'idStatus' });

Status.sync();

export default Status;