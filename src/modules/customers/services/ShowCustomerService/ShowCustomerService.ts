import { IFindCustomer } from '@modules/customers/domain/models/IFindCustomer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../../domain/models/ICustomer';
import { ICustomersRepository } from '../../domain/repositories/ICustomersRepository';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ email }: IFindCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Email não existe na base de dados', 401);
    }

    return customer;
  }
}

export default ShowCustomerService;
