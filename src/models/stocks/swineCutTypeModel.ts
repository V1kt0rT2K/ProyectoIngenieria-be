import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class SwineCutType extends Model {

    get idSwinecutType(): number {
        return this.getDataValue("idSwinecutType");
    }

    get swineCutTypeName(): string {
        return this.getDataValue("swinecutName");
    }

    get description(): string {
        return this.getDataValue("description");
    }
}
SwineCutType.init(
    {
        idSwineCutType: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        swineCutTypeName: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING('MAX'),
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'SwineCutType',
        tableName: 'tblSwineCutTypes',
        schema: 'stock',
    },
)
SwineCutType.sync();
export default SwineCutType;