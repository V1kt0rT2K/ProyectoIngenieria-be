import express, { Express, Request, Response, NextFunction } from "express";
import indexRoutes from './indexRoutes';
import { queryResponse } from "./utils/queryResponse";
// import createWebSocketServer from './services/websocketService'; // Importa el servidor WebSocket

const app: Express = express();
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Auth-Token'],
    exposedHeaders: ['Auth-Token'],
};
app.use(express.json());
//app.use(cors(corsOptions));


app.use((req:Request, res:Response, next:NextFunction) => {

    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self'; style-src 'self'" 
    );
  
    next();
  });

  app.use((err: { status: number; }, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).send(queryResponse.error(400, "Error en la solicitud"));
    }
    next();
});

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(401);
});

app.use(indexRoutes);

//dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`[SERVER] running at http://localhost:${port}`);
});