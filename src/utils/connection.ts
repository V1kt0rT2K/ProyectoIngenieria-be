import db , {ConnectionPool} from 'mssql';
import { config } from '../config';
import { Request } from 'express';

const connectionConfig = {
    user : config.DB_USER,
    password : config.DB_PASSWORD,
    database : config.DB_NAME,
    server : config.DB_SERVER,
    options: {
        encrypt: false,
        trustServerCertificate: false,
    }  

};

let pool : ConnectionPool;

async function connectDB() {
    try{
        pool = await db.connect(connectionConfig);
    }catch(error){
        console.log(error);
    }
    return pool;
};


async function disconnectDB() {
    await pool.close();
}


export async function executeProcedure(query: string, params? : { [key:string] : any }) : Promise<any>{
    try{
        const pool = await connectDB();
        const request = pool.request();

        if(params){
            for(let key in params){
                request.input(key, params[key]);
            }
        }

        const result = await request.execute(query);

        console.log("result interno", result);

        if(result.recordset[0].JsonResponse){
            const jsonResponse = JSON.parse(result.recordset[0].JsonResponse);

            return jsonResponse;
        }else{
            console.log('No hay datos que mostrar');
            return '';
        }
    }
    catch(error){
        console.log(error);
    }

    return '';
}


