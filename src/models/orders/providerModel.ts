import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Provider extends Model{
    get idProvider(): number {
        return this.getDataValue("idProvider");
    }

    get providerName(): string {
        return this.getDataValue("providerName");
    }

};

Provider.init(
    {
        idProvider:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        providerName:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        },
        RTN:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        },
        providerContact:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        },
        location:{
            type:DataTypes.STRING('MAX'),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Provider',
        tableName: 'tblProviders',
        schema: 'orders'
    }
)

Provider.sync();
export default Provider;