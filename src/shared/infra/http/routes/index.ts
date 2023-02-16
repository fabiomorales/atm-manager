import atmRouter from '@modules/atm/infra/routes/atm.routes';
import customersRouter from '@modules/customers/infra/routes/customers.routes';
import movementRouter from '@modules/movement/infra/routes/movement.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customer', customersRouter);
routes.use('/atm', atmRouter);
routes.use('/movement', movementRouter);

routes.get('/', (_request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export default routes;
