import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';

class Notification extends Model {
    get idNotification(): number {
        return this.getDataValue("idNotification");
    }
    
    get message(): string {
        return this.getDataValue("message");
    }
    
    get show(): boolean {
        return this.getDataValue("show");
    }
    get idUser(): number {
        return this.getDataValue("idUser");
    }
}
Notification.init(
    {
        idNotification: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING('MAX'),
            allowNull: false,
        },
        generationDate: {
            type: DataTypes.DATE,
            //allowNull: false,
        },
        show: {
            type: DataTypes.BOOLEAN,
            //allowNull: false,
            //defaultValue: true
        },
        idUser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            references: {
                model: "User",
                key: "idUser",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'Notification',
        tableName: 'tblNotifications',
        schema: 'asset',
        
    },
);
Notification.sync();
export default Notification;