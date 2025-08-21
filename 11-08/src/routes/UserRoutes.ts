import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

const controller = new UserController();

router.get('/users', controller.list);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);
router.get('/users/:id', controller.getById);

export default router;