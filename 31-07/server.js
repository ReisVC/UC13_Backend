const express = require('express'); // Biblioteca usada para criar servidores com Node
const mysql = require('mysql2'); // Biblioteca que permite interações com o banco
const bodyParser = require('body-parser'); // Biblioteca que entende os dados enviadosno formato JSON

// Crio o objeto Express, que me permite acessar métodos para configurar meu servidor
const app = express();
// Configura o servidor para aceitar os dados no formato JSON
app.use(bodyParser.json());

// Configura a conexão, passando todas as informações necessárias para se conectar com o servidor de banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // endereço do servidor de bacno de dados
    port: 3306, // porta que ele usa
    user: 'root', // usuário
    password: 'root', // senha
    database: 'meu_backend' // nome do banco de dados
});

// O método connect (que é da biblioteca mysql2) temta se conectar ao banco 
// Se erro não for nulo, não faz a conexão
// Recebe como argumento uma função de callback - ou sejam uma funcão que será executada depois que o banco de dados responder.
connection.connect(error => {
    if(error) {
        console.error('Erro ao conectar ao banco de dados: ' + error.stack);
        return;
    }
    console.log('Conectado ao banco de dados com ID ' + connection.threadId);
}
);

// Rotas

// Cria uma rota HTTP POST para cadastrar um novo usuário no banco de dados
// app é a nossa aplicação Express
// .post() define que essa rota aceita apenas requisições HTTP do tipo POST
// '/usuarios' é o caminho da URL
// (reqm res) -> { ... } é a função de callback que será executada quando essa rota for chamada
// req (request): objeto que contém todas as informaçãoes da requisição feita pelo cliente
// res (response): objeto usado para enviar uma resposta ao cliente
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES ( ?, ?, ?)';
    connection.query(sql, [nome, email, senha], (error) => {
        if(error) return res.status(500).send('Erro ao adicionar usuário: ' + error.message);
        res.status(201).send('Usuário adicionado com sucesso.');
    });
});

app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    connection.query(sql, (error, results) => {
        if(error) return res.status(500).send('Erro ao obter usuários');
        res.json(results)
    });
});

app.get('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
        if(error) return res.status(500).send('Erro ao buscar usuário');
        res.json(results)
    });
})

app.put('/usuarios/:id', (req, res) => {
    const id = req.params;
    const { nome, email, senha } = req.body;
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
    connection.query(sql, [nome, email, senha, id], (error) => {
        if(error) return res.status(500).send('Erro ao atualizar usuário: ' + error.message);
        res.status(201).send('Usuário atualizado com sucesso.');
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(sql, [ id ], (error) => {
        if(error) return res.status(500).send('Erro ao deletar usuário: ' + error.message);
        res.status(201).send('Usuário deletado com sucesso.')
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na port ${PORT}`)
});