import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const controller = new ProductController();

router.post('/produtos', controller.createProduct);
router.get('/produtos', controller.listAllProducts);
router.delete('/produtos/:id', controller.deleteProduct);
router.put('/produtos/:id', controller.updateProduct);

export default router;