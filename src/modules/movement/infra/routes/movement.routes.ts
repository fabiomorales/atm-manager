import { Router } from 'express';
import MovementController from '../controllers/MovementController';
import { createValidation, showValidation } from '../controllers/MovementControllerValidation';

const movementRouter = Router();
const movementController = new MovementController();

movementRouter.get('/:customerId', showValidation, movementController.list);

movementRouter.post('/', createValidation, movementController.create);

export default movementRouter;
