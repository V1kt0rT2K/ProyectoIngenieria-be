import express, { Express, Request, Response, NextFunction } from "express";
import indexRoutes from './indexRoutes';

const app: Express = express();
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.sendStatus(401);
});

app.use(indexRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`[SERVER] running at http://localhost:${port}`);
});