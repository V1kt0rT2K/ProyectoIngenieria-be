import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';
import { MAX } from 'mssql';
import personModel from './personModel';
import UserRequest from './userRequestModel';

class User extends Model {}

User.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    job: {
      type: DataTypes.STRING(MAX),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(MAX),
      allowNull: false,
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    idPerson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personModel',
        key: 'idPerson',
      },
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userRolModel',
        key: 'idRole',
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'tblUsers',
    schema: 'users',
    timestamps: false,
    indexes: [
      {
        name: 'ukUser_Person',
        unique: true,
        fields: ['idPerson', 'idUser'],
      },
    ],
  }
);

User.belongsTo(UserRequest, { foreignKey: 'idUser' });
UserRequest.hasMany(User, { foreignKey: 'idUserRequest' });
User.hasOne(personModel, { foreignKey: 'idPerson' });

User.sync();

export default User;
