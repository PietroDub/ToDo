import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";

const tarefaRoutes = Router();

tarefaRoutes.post("/", TarefaController.Create);
tarefaRoutes.get("/", TarefaController.GetAll);
tarefaRoutes.put("/:id", TarefaController.Update);
tarefaRoutes.get("/:id", TarefaController.GetById);


export default tarefaRoutes;