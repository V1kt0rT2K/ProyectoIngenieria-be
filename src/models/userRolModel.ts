import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/connection";

class UserRol extends Model {}

UserRol.init(
  {
    idRole: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING('MAX'),
      allowNull: false,
    },
    roleDescription: {
      type: DataTypes.STRING('MAX'),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, 
    timestamps: false,
    modelName: 'UserRol', 
    tableName: 'tblUserRoles',
    schema : 'users'
  },
);

UserRol.sync();

export default UserRol;