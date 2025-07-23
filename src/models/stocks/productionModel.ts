import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Production extends Model{
    get idProduct(): number {
        return this.getDataValue("idProduct");
    }

};

Production.init(
    {
        idProduction:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idSwineBatch:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'SwineBatch',
                key: 'idSwineBatch'
            }
        },
        idProduct:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Product',
                key: 'idProduct'
            }
        },
        quantity: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Production',
        tableName: 'tblProductions',
        schema: 'stock'
    }
)

Production.sync();
export default Production;