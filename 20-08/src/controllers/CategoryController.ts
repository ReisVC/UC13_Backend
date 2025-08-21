import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

export class CategoryController {
    private categoryRepository = AppDataSource.getRepository(Category);

    list = async (req: Request, res: Response) => {
        const products = await this.categoryRepository.find();
        return res.json(products);
      }

    create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const product = this.categoryRepository.create({ name });
    await this.categoryRepository.save(product);

    return res.status(201).json(product);
  }
}