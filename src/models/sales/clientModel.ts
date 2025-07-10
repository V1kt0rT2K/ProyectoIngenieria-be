import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Client extends Model {

    get idClient(): number {
        return this.getDataValue("idClient");
    }
    get identitynumber(): string {
        return this.getDataValue("identitynumber");
    }
}

Client.init(
    {
        idClient: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        identitynumber: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },
        
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Client',
        tableName: 'tblClient',
        schema: 'sales',
        indexes: [
            {   unique: true, fields: ['identitynumber'] }
        ],
    },

);
Client.sync();
export default Client;