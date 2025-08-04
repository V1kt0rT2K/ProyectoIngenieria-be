import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SwineBatch extends Model{
    get idSwineBatch(): number {
        return this.getDataValue("idSwineBatch");
    }

     get quantity(): number {
        return this.getDataValue("quantity");
    }
    get stockQuantity(): number {
        return this.getDataValue("stockQuantity");
    }

    get idStage(): number {
        return this.getDataValue("idStage");
    }
};

SwineBatch.init(
    {
        idSwineBatch:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        birthDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
        ,
        generationDate:{
            type: DataTypes.DATE,
            allowNull: true, 
        },
        idStage:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:"Stage",
                key:"idStage"
            }
        },
        stockQuantity:{
            type:DataTypes.INTEGER,
            allowNull: false,
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