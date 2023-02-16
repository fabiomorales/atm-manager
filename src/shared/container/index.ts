import { IAtmRepository } from '@modules/atm/domain/repositories/IAtmRepository';
import AtmRepository from '@modules/atm/infra/knexorm/repositories/AtmRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/knexorm/repositories/CustomersRepository';
import { IMovementRepository } from '@modules/movement/domain/repositories/IMovementRepository';
import MovementRepository from '@modules/movement/infra/knexorm/repositories/MovementRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);

container.registerSingleton<IAtmRepository>('AtmRepository', AtmRepository);

container.registerSingleton<IMovementRepository>('MovementRepository', MovementRepository);
