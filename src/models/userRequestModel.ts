import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/connection";
import { MAX } from 'mssql';
import UserRol from "./userRolModel";

class UserRequest extends Model {
    get idUser(): number {
        return this.getDataValue("idUser");
    }
}

UserRequest.init(
    {
        idUserRequest: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'userModel',
                key: 'idUser'
            },
        },
        generationDate: {
            type: DataTypes.DATE,
        },
        idRole: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'userRol',
                key: 'idRole',
            }
        },
        idStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName: 'tblStatus',
                    schema: 'asset',
                },
                key: 'idStatus'
            }
        },
        userName: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        }
    },

    {
        sequelize, 
        timestamps: false,
        modelName: 'UserRequest', 
        tableName: 'tblUserRequests',
        schema : 'users'
    },

);

UserRequest.belongsTo(UserRol, { foreignKey: 'idUserRequest' });
UserRol.hasMany(UserRequest, { foreignKey: 'idRole' });

UserRequest.sync();

export default UserRequest;