// Importa os decorators e funções do TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Importa a entidade User, para definir a relação entre Post e User
import { User } from './User';

// @Entity('posts') indica que esta classe representa a tabela "posts" no banco
@Entity('posts')
export class Post {
    // @PrimaryGeneratedColumn() indica que o campo é a chave primária (PK) e será auto-incrementado
    @PrimaryGeneratedColumn()
    id: number;

    // @Column define que esta propriedade será uma coluna no banco
    // type: "varchar" → tipo texto
    // length: 100 → tamanho máximo
    // nullable: false → não pode ser nulo
    @Column({ type: "varchar", length: 100, nullable: false })
    title: string;

    /*
        @ManyToOne indica que vários posts podem pertencer a um único usuário (N:1)
        () => User → função que retorna a entidade relacionada
        user => user.posts → indica a propriedade na entidade User que referencia os posts
        O TypeORM usa isso para criar a chave estrangeira automaticamente
    */
    @ManyToOne(() => User, user => user.posts)
    user: User; // Cada post terá exatamente um usuário dono
}
