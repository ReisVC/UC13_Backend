import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();  // Tipando 'app' como 'Application'
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());

// Define um middleware chamado "porteiroMiddleware"
// Middleware é uma função que intercepta a requisição antes de ela chegar à rota final
// NextFunction é o tipo da função next(). Se você não chamar next(), a requisição fica presa no middleware e não chega na rota final
const porteiroMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
    // Exibe no console o caminho da URL acessada na requisição
    console.log(`📢 Requisição recebida em: ${req.url}`);
  
    // Chama a função "next" para permitir que a requisição continue para o próximo middleware ou rota
    next();
  };
  
// Aplica o middleware "porteiroMiddleware" de forma global
// Isso significa que ele será executado em **todas as requisições**, independentemente da rota
app.use(porteiroMiddleware);

app.get('/meunome/:nome', (req: Request, res: Response): Response => {
    const { nome } = req.params;
    return res.send(`Seu nome é ${nome}`)
})

app.get('/saudacao', (req: Request, res: Response): Response => {
    return res.send('Olá, Jovem programador')
})

// Middleware que trata requisições que não bateram em nenhuma rota definida
app.use((req: Request, res: Response): Response => {
    // Retorna uma resposta com status HTTP 404 (Não Encontrado)
    // E envia um JSON com a mensagem personalizada
    return res.status(404).json({ mensagem: 'Rota não encontrada!' });
});
  
  //Esse middleware não chama next(). Isso é proposital.
  
  //Ele é executado por último, quando nenhuma das rotas anteriores foi atendida. Detalhe: ele deve ser criado por último, depois de todas as rotas.
  
  //Ou seja: se o Express chegar até aqui, é porque nenhuma rota válida foi encontrada para a URL solicitada → então ele retorna um erro 404.

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});