import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../models/Product";

export class ProductController {
    private productRepository = AppDataSource.getRepository(Product);

    list = async (req: Request, res: Response) => {
        // const products = await this.productRepository.find({ relations: ['category'], select: { name: true, category: {name: true}}} );
        const products = await this.productRepository.find({ relations: ['category']});
        return res.json(products);
      }

    create = async (req: Request, res: Response) => {
    const { name, price, category} = req.body;

    const product = this.productRepository.create({ name, price, category});
    await this.productRepository.save(product);

    return res.status(201).json(product);
  }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;

        const product = await this.productRepository.find({ 
            where: { id: Number(id)},
            relations: [ 'category' ]})
        return res.json(product)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, price, category} = req.body;

        const product = await this.productRepository.createQueryBuilder().update(Product).set({ name: name, price: price, category: category}).where("id = :id", { id: id}).execute()
        return res.status(200).json(product)
    }
}
