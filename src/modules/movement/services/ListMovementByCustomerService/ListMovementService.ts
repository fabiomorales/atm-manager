import { IListMovementByCustomer } from '@modules/movement/domain/models/IListMovementByCustomer';
import { IMovement } from '@modules/movement/domain/models/IMovement';

import { IMovementRepository } from '@modules/movement/domain/repositories/IMovementRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListMovementByCustomerService {
  constructor(
    @inject('MovementRepository')
    private movementRepository: IMovementRepository,
  ) {}

  public async execute({ customerId }: IListMovementByCustomer): Promise<Array<IMovement>> {
    const movements = await this.movementRepository.findAllByCustomerId(customerId);

    return movements;
  }
}

export default ListMovementByCustomerService;
