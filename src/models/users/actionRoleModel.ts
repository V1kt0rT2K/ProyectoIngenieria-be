import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class ActionRole extends Model {
    get idActionRole(): number {
        return this.getDataValue("idActionRole");
    }
    
    get idAction(): string {
        return this.getDataValue("idAction");
    }
    
    get idRole(): string {
        return this.getDataValue("idRole");
    }

}
ActionRole.init(
    {
        idActionRole: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idAction : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model : "Action",
                key : "idAction"
            }
        },
        idRole : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model : "UserRole",
                key : "idRole"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'ActionRole',
        tableName: 'tblActionRoles',
        schema: 'users',
        
    },
);
ActionRole.sync();
export default ActionRole;