import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class ClientType extends Model {

    get idClientType(): number {
        return this.getDataValue("idClientType");
    }

    get clientTypeName(): string {
        return this.getDataValue("clientTypeName");
    }
}

ClientType.init(
    {
        idClientType: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clientTypeName : {
            type: DataTypes.STRING('MAX'),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'ClientType',
        tableName: 'tblClientTypes',
        schema: 'sales',
        // indexes: [
        //     {   unique: true, fields: ['identification'] }
        // ],
    },

);
ClientType.sync();
export default ClientType;