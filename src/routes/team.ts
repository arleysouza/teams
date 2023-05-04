import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.post('/', TeamController.create);
routes.get('/', TeamController.list);
routes.get('/:name', TeamController.listByName);
routes.delete('/', TeamController.delete);
routes.put('/', TeamController.update);

export default routes;