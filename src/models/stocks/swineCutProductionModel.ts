import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import SwineCutType from './swineCutTypeModel';

class SwineCutProduction extends Model {

    get idSwineCutProduction(): number {
        return this.getDataValue("idSwineCutProduction");
    }

    get idSwine(): number {
        return this.getDataValue("idSwine");
    }

    get quantity(): number {
        return this.getDataValue("quantity");
    }
    get idSwineCutType(): number {
        return this.getDataValue("idSwineCutType");
    }
    get processDate(): Date {
        return this.getDataValue("processDate");
    }
}
SwineCutProduction.init(
    {
        idSwineCutProduction: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idSwine: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'Swine',
                key: 'idSwine',
            }
        },
        quantity: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        idSwineCutType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "SwineCutType", 
                key: 'idSwinecutType', 
            },
        },
        processDate: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineCutProduction',
        tableName: 'tblSwineCutProductions',
        schema: 'stock',
    },
);
SwineCutProduction.sync();
export default SwineCutProduction;