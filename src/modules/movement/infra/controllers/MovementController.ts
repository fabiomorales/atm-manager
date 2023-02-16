import { ICreateMovement } from '@modules/movement/domain/models/ICreateMovement';
import { IListMovementByCustomer } from '@modules/movement/domain/models/IListMovementByCustomer';
import CreateMovementService from '@modules/movement/services/CreateMovementService/CreateMovementService';
import ListMovementByCustomerService from '@modules/movement/services/ListMovementByCustomerService/ListMovementService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class MovementController {
  public async create(request: Request<unknown, unknown, ICreateMovement>, response: Response): Promise<Response> {
    const { atmId, customerId, value } = request.body;

    const createMovement = container.resolve(CreateMovementService);

    const movement = await createMovement.execute({
      atmId,
      customerId,
      value,
    });

    return response.json(movement);
  }

  public async list(request: Request<IListMovementByCustomer>, response: Response): Promise<Response> {
    const { customerId } = request.params;

    const createMovement = container.resolve(ListMovementByCustomerService);

    const movement = await createMovement.execute({ customerId });

    return response.json(movement);
  }
}
