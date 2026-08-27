import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "node:module";
import tarefaRoutes from "./Routes/tarefa.routes.js";
import usuarioRoutes from "./Routes/usuario.routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const FRONT_END_URL = process.env.FRONTEND_URL || PORT;

// suporte para importar arquivos JSON usando Esmodules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();

// comunicação entre front e back usando JSON
app.use(express.json());

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: FRONT_END_URL ,
}));

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ligar o express com as rotas
app.use("/Todo/Tarefas", tarefaRoutes);
app.use("/Todo/Usuarios", usuarioRoutes);

// porta da api
app.listen(PORT, () => {
    console.log("Servidor rodando na porta 5000");
});