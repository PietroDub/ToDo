import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const tarefaRoutes = Router();

tarefaRoutes.post("/", UserMiddleware, TarefaController.Create);
tarefaRoutes.get("/", UserMiddleware, TarefaController.GetAll);
tarefaRoutes.put("/:id", UserMiddleware, TarefaController.Update);
tarefaRoutes.get("/:id", UserMiddleware, TarefaController.GetById);


export default tarefaRoutes;