import "reflect-metadata";
import express, { Application } from "express";
import router from "./routes/UserRoutes";
import { AppDataSource } from "./config/data-source";
import productRoutes from "./routes/ProductRoutes";
import categoryRoutes from "./routes/CategoryRoutes";

const app: Application = express();
const PORTA: number = 3000;

app.use(express.json());
/*
  .initialize() é um método do ORM que inicia a conexão com o banco (que nem fazíamos com o createPool() da bilioteca do mysql2) e preparar todos os recursos antes de usar. Abre a conexão com o banco usando as configurações (host, porta, usuário, senha, banco), carrega as entidades (models/tabelas), executa sincronização (se synchronize: true estiver definido), que é o que cria as tabelas. Initialize é assíncrono, portanto retorna uma Promise. O que fica dentro de .then() é o que acontece se der certo, e o que fica no .catch() é o que acontece se houver erro.
*/
AppDataSource.initialize()
    .then(() => {
        console.log("📦 Banco conectado com sucesso");
        app.use(router);
        app.use(productRoutes);
        app.use(categoryRoutes);

        app.listen(PORTA, () => {
            console.log(`🚀 Servidor rodando na porta ${PORTA}`);
        });
    })
    .catch((err) => console.error("❌ Erro ao conectar no banco:", err));