import express from "express";
import dotenv from "dotenv";
import routes from "../router/index.js";
import db from "../config/db.js";

import "../models/associations.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;


// Sincroniza os modelos com o MySQL e abre o servidor
db.sync({ force: false })
    .then(() => {
        console.log("🟢 Conexão com o MySQL realizada e tabelas sincronizadas!");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("🔴 Erro ao sincronizar o banco de dados:", error);
    });

export default app;