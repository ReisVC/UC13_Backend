import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/products', productController.list);
productRoutes.get('/products/:id', productController.getById);
productRoutes.post('/products', productController.create);
productRoutes.put('/products/:id', productController.update);

export default productRoutes;