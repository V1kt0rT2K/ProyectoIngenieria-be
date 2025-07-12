import { Model, DataTypes } from "sequelize";
import sequelize from "../../utils/connection";

class UserRequest extends Model {
    get idUser(): number {
        return this.getDataValue("idUser");
    }

    get idStatus(): number {
        return this.getDataValue("idStatus");
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
                model: 'UserRole',
                key: 'idRole',
            }
        },
        idStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Status",
                key: 'idStatus'
            }
        },
        userName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING('MAX'),
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

UserRequest.sync();

export default UserRequest;