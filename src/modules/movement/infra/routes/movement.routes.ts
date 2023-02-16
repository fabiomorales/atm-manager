import { Router } from 'express';
import MovementController from '../controllers/MovementController';

const movementRouter = Router();
const movementController = new MovementController();

movementRouter.get('/:customerId', movementController.list);

movementRouter.post('/', movementController.create);

export default movementRouter;
