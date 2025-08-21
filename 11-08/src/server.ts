import express, { Application } from "express";
import routerUser from "./routes/UserRoutes";
import routerProduct from "./routes/ProductRoutes";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(routerUser);
app.use(routerProduct)

app.listen(PORT, (): void => {
    console.log(`Rodando na porta ${PORT}`)
});