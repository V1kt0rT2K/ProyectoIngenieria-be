import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class User extends Model {
  get idUser(): number {
    return this.getDataValue("idUser");
  }

  get idRole(): number {
    return this.getDataValue("idRole");
  }

  get email(): string {
    return this.getDataValue("email");
  }

  get password(): string {
    return this.getDataValue("password");
  }

  get job(): string {
    return this.getDataValue("job");
  }

  get isEnabled(): boolean {
    return this.dataValues("isEnabled");
  }

  get idPerson(): number {
    return this.dataValues("idPerson");
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
      type: DataTypes.STRING('MAX'),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING('MAX'),
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
        model: "Person",
        key: 'idPerson',
      },
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserRole",
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

User.sync();

export default User;
