import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SwineBatch extends Model{};

SwineBatch.init(
    {
        idSwineBatch:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        swineQuantityRemaining:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        estimatedWeight:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        generationDate:{
            type: DataTypes.DATE
        },
        idStage:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:"Stage",
                key:"idStage"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineBatch',
        tableName: 'tblSwineBatches',
        schema: 'stock'
    }
)

SwineBatch.sync();
export default SwineBatch;