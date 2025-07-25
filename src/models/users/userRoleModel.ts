import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/connection";

class UserRole extends Model {
  get roleName(): string {
    return this.getDataValue("roleName");
  }
}

UserRole.init(
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
    modelName: 'UserRole',
    tableName: 'tblUserRoles',
    schema: 'users'
  },
);

UserRole.sync();

export default UserRole;