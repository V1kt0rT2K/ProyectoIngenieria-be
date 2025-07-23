import request from 'supertest';
import express from 'express';
// import statusRouter from '../../routes/asset/statusRoutes';
// import salesCheckRouter from '../../routes/sales/salesCheckRoutes';
import indexRouter from '../../indexRoutes';
import sequelize from '../../utils/connection';

describe('Test Stage Routes' ,() =>{

    let app = express.application;

    beforeAll(() => {   
        app = express();
        app.use(express.json());
        // app.use('/asset',statusRouter);
        // app.use('/sales',salesCheckRouter);
        app.use(indexRouter);
    });

    describe('Test GET /get/all ', () =>{
        it("should respond with all stages", async () => {
            const response = await request(app).get('/asset/status/get/all');

            console.log(response);
            expect(response.status).toBe(200);
        });
    });

    describe('Test GET abcd ', () =>{
        it("should respond with all stages", async () => {
            const response = await request(app).get('/sales/salescheck/get/all');

            //console.log(response);
            expect(response.status).toBe(200);
        });
    });

    describe('Test GET ad', () =>{
        it("should respond with all stages", async () => {
            const response = await request(app).post('/sales/salescheck/generate').send({
                idUser : 1,
                idClient : null,
                SwineCutBatchConsumption: [
                    {
                        idSwineCutBatch: 1,
                        quantity: 2.2
                    },
                    {
                        idSwineCutBatch: 2,
                        quantity: 2.1
                    }
                ]
            });

            //console.log(response);
            expect(response.status).toBe(200);
        });
    });

    afterAll(async () =>{
       await sequelize.close();
    });


});