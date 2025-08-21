// Importa tipos do Express para lidar com requisições e respostas
import { Request, Response } from 'express';

// Importa a instância do DataSource, que é a conexão com o banco
import { AppDataSource } from '../config/data-source';

// Importa a entidade User para trabalhar com a tabela de usuários
import { User } from '../models/User';

// Cria a classe UserController, que contém os métodos para manipular usuários
export class UserController {
    // Cria o repositório do User, que permite fazer operações no banco
    // O repositório é como uma “camada de acesso ao banco” fornecida pelo TypeORM. É um objeto fornecido pelo TypeORM que sabe como fazer operações no banco para uma entidade específica. Sem esta linha de código, não conseguimos interagir com o banco.
    private userRepository = AppDataSource.getRepository(User);

    // Método que lista todos os usuários
    // async → usamos await dentro dele para esperar o resultado do banco
    async list(req: Request, res: Response) {
        // find é uma função do repositório do TypeORM que busca um ou mais registros de uma entidade no banco.
        // se chamarmos assim: 'const users = await userRepository.find();' ele busca todos os usuários, retornando um array de User.
        // O TypeORM permite passar um objeto com opções dentro do find() para filtrar, ordenar ou incluir relações.
        /*
        O {} é um objeto de opções.
        
        Ele permite informar como a busca deve ser feita, por exemplo:
        
        relations → quais relações devem ser carregadas
        
        where → condições (where: { name: 'João' })
        
        order → ordenação (order: { name: 'ASC' })

        relations recebe uma lista de propriedades que representam relações entre entidades.
        
        No seu caso, ['posts'] diz: “ao buscar os usuários, carregue também todos os posts de cada usuário”.
        
        É um array porque você pode incluir várias relações ao mesmo tempo (poderia ser relations: ['posts', 'comments', 'profile'])
        */
        // find({ relations: ['posts'] }) → busca todos os usuários
        // e carrega também os posts de cada usuário (faz um JOIN automaticamente)
        const users = await this.userRepository.find({ relations: ['posts'] });

        // Retorna os usuários em formato JSON na resposta
        return res.json(users);
    }

    // Método que cria um novo usuário
    async create(req: Request, res: Response) {
        // Pega os dados do corpo da requisição
        const { name, email } = req.body;

        // Cria um novo objeto User (ainda não salva no banco)
        // Ele cria um objeto da entidade User (é como se usássemos new User() etc etc., só que pronto para ser usado no próximo método - que salva no banco de dados)
        const user = this.userRepository.create({ name, email });

        // Salva o usuário no banco de dados
        await this.userRepository.save(user);

        // Retorna o usuário criado com status 201 (Created)
        return res.status(201).json(user);
    }
}
