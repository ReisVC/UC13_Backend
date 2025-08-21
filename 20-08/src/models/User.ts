// Importa os decorators e funções do TypeORM para criar a entidade e mapear colunas e relacionamentos
// Decorators são uma funcionalidade do TypeScript (e do JavaScript moderno) que permitem adicionar comportamento extra a classes, métodos ou propriedades de forma declarativa, usando o símbolo @. É por causa deles que conseguimos 'transformar' as classes e as propriedades dela em tabelas e colunas no nosso banco de dados. Cada decorator, cada @, diz ao ORM o que aquela classe ou propriedade representa.
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

// Importa a entidade Post, para definir a relação entre User e Post
// import { Post } from './Post';

// @Entity('users') indica que esta classe representa a tabela "users" no banco
@Entity('users')
export class User {
    // @PrimaryGeneratedColumn() indica que o campo é a chave primária (PK) e será auto-incrementado
    @PrimaryGeneratedColumn()
    id: number;

    // @Column define que esta propriedade será uma coluna no banco
    // length: 100 → tamanho máximo do campo
    // nullable: false → não pode ser nulo
    @Column({ length: 100, nullable: false })
    name: string;

    // @Column com unique: true garante que o valor será único na tabela (não pode repetir)
    @Column({ unique: true })
    email: string;

    /*
        @OneToMany indica que um usuário pode ter vários posts (1:N)
        () => Post → função que retorna a entidade relacionada
        post => post.user → indica a propriedade na entidade Post que referencia o usuário
        O TypeORM usa isso para criar a relação e a chave estrangeira automaticamente
        Essa é apenas uma das pontas desta ligação. Devemos declarar o restante na entidade Post, para que o ORM consiga entender completamente             toda a relação que estamos tentando definir.
    */
    // @OneToMany(() => Post, post => post.user)
    // posts: Post[]; // Como um usuário pode ter muitos posts, usamos um array pois a propriedade posts vai armazenar uma lista de posts que pertencem àquele usuário.
}
