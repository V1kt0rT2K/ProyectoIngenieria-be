import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/connection';
import { MAX } from 'mssql';
import personModel from './personModel';
import UserRequest from './userRequestModel';
import UserRol from './userRolModel';

class User extends Model {
  get idUser(): number {
    return this.getDataValue("idUser");
  }

  get idRole(): number {
    return this.getDataValue("idRole");
  }

  get email(): number {
    return this.getDataValue("email");
  }

  get job(): number {
    return this.getDataValue("job");
  }

  get isEnabled(): boolean {
    return this.dataValues("isEnabled");
  }
}

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

UserRol.belongsTo(User, { foreignKey: "idRole", targetKey: "idRole" });
User.hasOne(UserRol, { foreignKey: "idRole", sourceKey: "idRole" });

User.belongsTo(UserRequest, { foreignKey: 'idUser', targetKey: "idUser" });
UserRequest.hasMany(User, { foreignKey: 'idUser', sourceKey: "idUser" });

User.hasOne(personModel, { foreignKey: "idPerson", sourceKey: "idPerson" });
personModel.belongsTo(User, { foreignKey: "idPerson", targetKey: "idPerson" });

User.sync();

export default User;
