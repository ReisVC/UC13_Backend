import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PostController } from '../controllers/postController';

const routes = Router();
const userController = new UserController();
const postController = new PostController();

routes.get('/users', userController.list);
routes.post('/users', userController.create);
routes.post('/posts', postController.create);

export default routes;