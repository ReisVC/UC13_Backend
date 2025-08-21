import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Post } from '../models/Post';
import { User } from '../models/User';

export class PostController {
    private postRepository = AppDataSource.getRepository(Post);
    private userRepository = AppDataSource.getRepository(User);

    async create(req: Request, res: Response) {
        const { title, userId } = req.body;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const post = this.postRepository.create({ title, user });
        await this.postRepository.save(post);
        return res.status(201).json(post);
    }
}