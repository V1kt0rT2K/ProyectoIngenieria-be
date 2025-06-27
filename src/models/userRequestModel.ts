import { Sequelize, DataType, Model, DataTypes } from "sequelize";
import sequelize from "../utils/connection";
import { MAX } from 'mssql';
import User from "./userModel";
import Status from "./statusModel";
import UserRol from "./userRolModel";

class UserRequest extends Model {}

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
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        modelName: 'Status', 
        tableName: 'tblUserRequests',
        schema : 'users'
    },

);

UserRequest.belongsTo(User, { foreignKey: 'idUser' });
UserRequest.belongsTo(Status, { foreignKey: 'idStatus' });
UserRequest.belongsTo(UserRol, { foreignKey: 'idRole' });

UserRequest.sync();

export default UserRequest;