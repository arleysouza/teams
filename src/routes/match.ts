import { Router } from "express";
import MatchController from "../controllers/MatchController";

const routes = Router();

routes.post('/', MatchController.create);
routes.get('/', MatchController.list);
routes.get('/:id', MatchController.listByTeam);
routes.delete('/', MatchController.delete);
routes.put('/', MatchController.update);

export default routes;