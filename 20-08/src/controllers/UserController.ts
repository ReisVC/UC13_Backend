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

    list = async (req: Request, res: Response) => {
    const users = await this.userRepository.find();
    return res.json(users);
  }

    create = async (req: Request, res: Response) => {
    const { name, email} = req.body;

    const user = this.userRepository.create({ name, email});
    await this.userRepository.save(user);

    return res.status(201).json(user);
  }
}
