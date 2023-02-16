import { IAtmRepository } from '@modules/atm/domain/repositories/IAtmRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IMovement } from '@modules/movement/domain/models/IMovement';
import { IMovementRepository } from '@modules/movement/domain/repositories/IMovementRepository';
import AppError from '@shared/errors/AppError';
import { MovementEnum } from '@shared/utils/constants';
import { inject, injectable } from 'tsyringe';
import { ICreateMovement } from '../../domain/models/ICreateMovement';
import { dispenseNotes } from './methods/dispenseNotes';
import { mountDescription } from './methods/mountDescription';
import { mountNewAtmValues } from './methods/mountNewAtmValues';
import { mountNotes } from './methods/mountNotes';

@injectable()
class CreateMovementService {
  constructor(
    @inject('AtmRepository')
    private atmRepository: IAtmRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MovementRepository')
    private movementRepository: IMovementRepository,
  ) {}

  public async execute({ atmId, customerId, value }: ICreateMovement): Promise<IMovement> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Não existe um Cliente com esse id', 401);
    }

    if (customer.balance < value) {
      throw new AppError('Saldo insuficiente para essa operação', 401);
    }

    const atm = await this.atmRepository.findById(atmId);

    if (!atm) {
      throw new AppError('Não existe um ATM com esse id', 401);
    }

    if (atm.total_bill < value) {
      throw new AppError('Valor solicitado não disponível', 401);
    }

    const notes = mountNotes(atm);

    const dispenseNotesResult = dispenseNotes(value, notes);

    const description = mountDescription(dispenseNotesResult);

    const atmValues = mountNewAtmValues(atm, dispenseNotesResult);

    const movementCreated = await this.movementRepository.create({
      description,
      value,
      atm_id: atmId,
      customer_id: customerId,
      type_movement: MovementEnum.SACK,
    });

    customer.balance -= value;

    await this.customersRepository.update(customerId, customer);

    await this.atmRepository.update(atmId, atmValues);

    return movementCreated;
  }
}

export default CreateMovementService;
