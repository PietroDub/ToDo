import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";

const routes = new Router();

routes.post("/", TarefaController.Create);
routes.get("/", TarefaController.GetAll);

export default routes;