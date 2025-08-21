import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false})
    name: string;

    @Column({ type: 'float', nullable: false})
    price: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    // @ManyToOne(() => User, user => user.posts)
    // user: User; // Cada post terá exatamente um usuário dono
}