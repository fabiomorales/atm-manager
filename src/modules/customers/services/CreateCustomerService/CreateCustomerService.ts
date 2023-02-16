import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../../domain/models/ICreateCustomer';
import { ICustomer } from '../../domain/models/ICustomer';
import { ICustomersRepository } from '../../domain/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(params: ICreateCustomer): Promise<ICustomer> {
    const existsCustomerCpf = await this.customersRepository.findByCpf(params.cpf);

    if (existsCustomerCpf) {
      throw new AppError('CPF informado já existe na base de dados', 401);
    }

    const existsCustomerEmail = await this.customersRepository.findByEmail(params.email);

    if (existsCustomerEmail) {
      throw new AppError('Email informado já existe na base de dados', 401);
    }

    const customer = await this.customersRepository.create(params);

    return customer;
  }
}

export default CreateCustomerService;
