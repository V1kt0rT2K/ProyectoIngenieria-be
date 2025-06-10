import sql, { ConnectionPool } from 'mssql';
//require('dotenv').config();

//import { DB_DATABASE, DB_PASSWORD, DB_SERVER, DB_USER } from "./config";

import {queryResponse} from './queryResponse';

export const dbSettings = {
    user: 'fulano1234_SQLLogin_1',
    password: 'grh33bcjf8',
    server: 'abcdPrueba.mssql.somee.com',
    database: 'abcdPrueba',
    options: {
        encrypt: false,
        trustServerCertificate: true, // true para desarrollador
    },
    pool: {
        max: 20, // Número máximo de conexiones en el pool
        min: 0,  // Número mínimo de conexiones en el pool
        idleTimeoutMillis: 120000 // Tiempo que una conexión puede estar inactiva antes de ser cerrada
    }
};

let pool: ConnectionPool;

export async function connectDB() {
    if (!pool) {
        try {
            pool = await sql.connect(dbSettings);
            console.log("Conexión exitosa");
        } catch (error) {
            console.log("Error al conectarse");
            console.error(error);
        }
    }
    return pool;
}

export async function disconnectDB() {
    console.log("cerrando conexión")
    await pool.close();
}

export async function executeQuery(query: string, params?: { [key: string]: any }): Promise<queryResponse> {
    try {
        const pool = await connectDB();
        const request = pool.request();

        // Si hay parámetros, añadirlos a la solicitud
        if (params) {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    request.input(key, params[key]);
                }
            }
        }

        // Ejecutar el procedimiento almacenado
        const result = await request.execute(query);

        // Verificar y procesar el resultado
        
         if (result.recordset?.length > 0 && result.recordset[0].JsonResult) {
            const jsonResult: queryResponse = JSON.parse(result.recordset[0].JsonResult);

            //console.log("jsonResult", jsonResult);
            
            return jsonResult;
        } else {
            // Retornar mensaje de error si no hay datos
            return queryResponse.error(404, "No se encontraron datos", 1);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta:', error);
        // Retornar respuesta de error en caso de excepción
        return queryResponse.error(500, "Error interno del servidor", 4);
    }
}

export async function executeQueryNoFormat(query: string, params?: { [key: string]: any }): Promise<queryResponse> {
    try {
        const pool = await connectDB();
        const request = pool.request();

        // Si hay parámetros, añadirlos a la solicitud
        if (params) {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    request.input(key, params[key]);
                }
            }
        }

        // Ejecutar el procedimiento almacenado
        const result = await request.execute(query);
        // Verificar y procesar el resultado
        if (result.recordset?.length > 0 && result.recordset[0]) {
            const jsonResult: queryResponse = new queryResponse([result.recordset[0]],[],false)
            return jsonResult;
        } else {
            // Retornar mensaje de error si no hay datos
            return queryResponse.error(404, "No se encontraron datos", 1);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta:', error);
        // Retornar respuesta de error en caso de excepción
        return queryResponse.error(500, "Error interno del servidor", 4);
    }
}