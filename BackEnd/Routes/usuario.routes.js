import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const usuarioRoutes = Router();

usuarioRoutes.post("/", UsuarioController.registrarUsuario);
usuarioRoutes.post("/", UsuarioController.LoginUsuario);
usuarioRoutes.post("/logout", UsuarioController.logout);
usuarioRoutes.post("/resetPassword", UsuarioController.resetPassword);
usuarioRoutes.post("/forgotPassword", UsuarioController.forgotPassword);
usuarioRoutes.get("/me", UserMiddleware, UsuarioController.profile);
usuarioRoutes.get("/getUsersExceptionLogged", UserMiddleware, UsuarioController.getAllExceptionLogged)

export default usuarioRoutes;