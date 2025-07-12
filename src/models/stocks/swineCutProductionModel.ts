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
    get idSwinecutType(): number {
        return this.getDataValue("idSwinecutType");
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idSwinecutType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "SwineCutType", 
                key: 'idSwinecutType', 
            },
        },
        processDate: {
            type: DataTypes.DATE,
            allowNull: false,
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