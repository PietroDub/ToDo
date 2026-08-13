import swaggerAutogen from "swagger-autogen";

const doc = {
    info:{
        title: 'API ToDo List',
        description: 'Documentação para testes automáticos do projeto'
    },
    host: 'localhost:5000',
    basepath: '/',

}

// nome do arquivo gerado automaticamente
const outputFile = "./swagger-output.json";

// caminho pras rotas
const routesFile = ["./index.js"];
swaggerAutogen()(outputFile, routesFile, doc);