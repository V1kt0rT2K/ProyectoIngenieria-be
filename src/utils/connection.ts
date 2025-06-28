import { Sequelize } from 'sequelize';
import { config } from '../config';
import { Request } from 'express';

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_SERVER,
        port: 1433,
        dialect : 'mssql',
        pool: {
        max: 5,
        min: 0,
        idle: 10000
        },
        dialectOptions: {
            options: { encrypt: false }
        }
    }
);

try {
    sequelize.authenticate();
    console.log('Conexión establecida exitósamente.');
} catch (error) {
    console.error('Error al conectar a la base:', error);
}

export default sequelize;
