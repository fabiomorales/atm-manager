import { Router } from 'express';
import AtmController from '../controllers/AtmController';

const atmRouter = Router();
const atmController = new AtmController();

atmRouter.get('/', atmController.list);

atmRouter.post('/', atmController.create);

export default atmRouter;
