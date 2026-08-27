import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";

const usuarioRoutes = Router();

usuarioRoutes.post("/", UsuarioController.registrarUsuario);
usuarioRoutes.post("/", UsuarioController.LoginUsuario);

export default usuarioRoutes;