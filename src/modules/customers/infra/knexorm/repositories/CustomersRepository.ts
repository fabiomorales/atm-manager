import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { Knex } from 'knex';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    return await this.ormRepository('customer').select('*').where('id', id).first();
  }

  public async findAll(): Promise<Array<ICustomer>> {
    return await this.ormRepository('customer').select('*');
  }

  public async findByCpf(cpf: string): Promise<ICustomer | undefined> {
    return await this.ormRepository('customer').select('*').where('cpf', cpf).first();
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    return await this.ormRepository('customer').select('*').where('email', email).first();
  }

  public async create({ balance, fisrt_name, last_name, cpf, email }: Partial<ICustomer>): Promise<ICustomer> {
    const [customer] = await this.ormRepository('customer')
      .insert({
        balance,
        fisrt_name,
        last_name,
        cpf,
        email,
      })
      .returning('*');

    return customer;
  }

  public async update(id: string, customer: Partial<ICustomer>): Promise<ICustomer> {
    const [customerUpdated] = await this.ormRepository('customer').where({ id }).update(customer).returning('*');

    return customerUpdated;
  }
}

export default CustomersRepository;
