import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Client extends Model {

    get idClient(): number {
        return this.getDataValue("idClient");
    }
    get identification(): string {
        return this.getDataValue("identification");
    }

    get fullName(): string {
        return this.getDataValue("fullName");
    }
    get idClientType(): number {
        return this.getDataValue("idClientType");
    }
}

Client.init(
    {
        idClient: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        identification: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        fullName : {
            type: DataTypes.STRING('MAX'),
        },
        contact : {
            type: DataTypes.STRING('MAX')
        },
        address : {
            type: DataTypes.STRING('MAX')
        },
        idClientType : {
            type: DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: "ClientType",
                key: "idClientType"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Client',
        tableName: 'tblClients',
        schema: 'sales',
        // indexes: [
        //     {   unique: true, fields: ['identification'] }
        // ],
    },

);
Client.sync();
export default Client;