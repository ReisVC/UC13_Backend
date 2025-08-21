import express, { Application, Request, Response } from 'express';

const app: Application = express();  // Tipando 'app' como 'Application'
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());

// Rota GET para a raiz
app.get('/', (req: Request, res: Response): void => {
  res.send('🚀 Servidor TypeScript rodando!');
});

app.get('/:nome', (req: Request, res: Response): void => {
    const { nome } = req.params;
    res.send(`Olá ${nome}, como você está?`)
});

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});