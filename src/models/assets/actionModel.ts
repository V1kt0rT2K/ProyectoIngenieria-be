import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Action extends Model {
    get idAction(): number {
        return this.getDataValue("idAction");
    }
    
    get actionName(): string {
        return this.getDataValue("actionName");
    }
    
    get actionDescription(): string {
        return this.getDataValue("actionDescription");
    }

}
Action.init(
    {
        idAction: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        actionName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        actionDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Action',
        tableName: 'tblActions',
        schema: 'asset',
        
    },
);
Action.sync();
export default Action;