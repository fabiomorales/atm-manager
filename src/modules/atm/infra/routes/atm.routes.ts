import { Router } from 'express';
import AtmController from '../controllers/AtmController';
import { createValidation } from '../controllers/AtmControllerValidation';

const atmRouter = Router();
const atmController = new AtmController();

atmRouter.get('/', atmController.list);

atmRouter.post('/', createValidation, atmController.create);

export default atmRouter;
