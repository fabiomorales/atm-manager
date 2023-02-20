import { Router } from 'express';
import { createValidation, showValidation } from '../controllers/CustomerControllerValidation';
import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/:email', showValidation, customersController.show);

customersRouter.post('/', createValidation, customersController.create);

export default customersRouter;
