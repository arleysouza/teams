import { Router, Request, Response } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.post('/', TeamController.create);
routes.get('/', TeamController.list);
routes.get('/:name', TeamController.listByName);
routes.delete('/', TeamController.delete);
routes.put('/', TeamController.update);

routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida com o time"}) );

export default routes;