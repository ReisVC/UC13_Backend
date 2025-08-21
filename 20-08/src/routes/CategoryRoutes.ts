import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const categoryRoutes = Router();
const productController = new CategoryController();

categoryRoutes.get('/categories', productController.list);
categoryRoutes.post('/categories', productController.create);

export default categoryRoutes;