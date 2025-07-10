import { DataTypes, INTEGER, Model } from 'sequelize';
import sequelize from '../utils/connection';

class Swine extends Model{};

Swine.init(
    {
        idSwine:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        numberAssigned:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idSwineBatch:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "SwineBatch",
                key: "idSwineBatch"
            }

        },
        isProcessed:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Swine',
        tableName: 'tblSwine',
        schema: 'stock'
    }
)

Swine.sync();
export default Swine;