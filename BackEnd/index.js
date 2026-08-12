import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "node:module";

// suporte para importar arquivos JSON usando Esmodules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();
const port = 3000;

// comunicação entre front e back usando JSON
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: `http://localhost:${port}`,
}));

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ligar o express com as rotas
app.use("/Todo/Tarefas", routes);

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});