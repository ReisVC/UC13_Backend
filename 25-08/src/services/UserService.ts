import { AppDataSource } from '../data-source'
import { User } from '../models/User'

export class UserService {
    private userRepository = AppDataSource.getRepository(User)

    // Função para criar um novo usuário
    async create(data: { name: string; email: string; password: string }) {
        // Verifica se já existe
        const exists = await this.userRepository.findOne({ where: { email: data.email } })
        if (exists) throw new Error('E-mail já cadastrado')
        const user = this.userRepository.create(data)
        await this.userRepository.save(user)

        const clone: any = { ...user }

        // Remove a propriedade 'password' do clone, garantindo que a senha não será enviada na resposta
        delete clone.password

        // Retorna o clone do usuário sem a senha
        return clone
    }

    // Método para encontrar todos os usuários
    async findAll() {
        // Busca todos os usuários no banco de dados usando o repositório do TypeORM
        const users = await this.userRepository.find()

        // map é um método de arrays que cria um novo array a partir de outro, aplicando uma função a cada elemento.
        // ele percorre todo o array e aplica a cada item do array uma função (que passamos como argumento do map)
        return users.map(u => {
            // Cria uma cópia do usuário atual (u) usando spread operator para não alterar o objeto original
            const clone: any = { ...u }

            // Remove a propriedade 'password' do clone, garantindo que a senha não será enviada na resposta
            delete clone.password

            // Retorna o clone sem senha, que será incluído no novo array gerado pelo map
            return clone
        })

        // O método retorna um array de usuários, todos sem a propriedade 'password'
    }

    async findById(id: number) {
        // Busca um usuário no banco de dados pelo ID usando o repositório do TypeORM
        const user = await this.userRepository.findOne({ where: { id } })

        // Se nenhum usuário for encontrado, lança um erro
        if (!user) throw new Error('Usuário não encontrado')

        // Cria uma cópia do usuário usando spread operator para não alterar o objeto original
        const clone: any = { ...user }

        // Remove a propriedade 'password' do clone, garantindo que a senha não será enviada na resposta
        delete clone.password

        // Retorna o clone do usuário sem a senha
        return clone
    }

    // Partial<User> indica que o objeto data pode ter qualquer propriedade do User, ou seja, não é obrigatório enviar todas. Por exemplo, quero atualizar apenas o nome, ou email e senha.
    async update(id: number, data: Partial<User>) {
        // Busca o usuário pelo ID usando o repositório
        const user = await this.userRepository.findOne({ where: { id } })

        // Se nenhum usuário for encontrado, lança um erro
        if (!user) throw new Error('Usuário não encontrado')

        // Se data contém a senha, definimos explicitamente no usuário para que o hashPassword seja chamado
        if (data.password) {
            user.password = data.password
        }

        // Copia apenas as outras propriedades existentes em data para user, sem alterar a senha novamente
        const { password, ...rest } = data
        // Object.assign() é um método do Object que copia propriedades de um ou mais objetos para um objeto alvo.
        Object.assign(user, rest)

        // Antes de salvar, o TypeORM chama @BeforeUpdate() no User,
        // que cuida do hash da senha se ela estiver presente e não estiver hasheada
        return await this.userRepository.save(user)
    }


    async remove(id: number) {
        // Busca o usuário pelo ID usando o repositório do TypeORM
        const user = await this.userRepository.findOne({ where: { id } })

        // Se nenhum usuário for encontrado, lança um erro
        if (!user) throw new Error('Usuário não encontrado')

        // Remove o usuário do banco de dados
        // TypeORM garante que apenas este registro será deletado
        await this.userRepository.remove(user)

        // Retorna uma mensagem de confirmação
        return { message: 'Usuário removido' }
    }

    async findByEmail(email: string) {
        // Busca um usuário no banco de dados pelo email usando o repositório do TypeORM
        // Retorna o usuário inteiro (incluindo a senha), ou undefined se não existir
        return this.userRepository.findOne({ where: { email } })
    }
}