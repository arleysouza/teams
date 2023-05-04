import { Router, Request, Response } from "express";
import team from './team';
import match from './match';

const routes = Router();

routes.use("/team", team);
routes.use("/match", match);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
