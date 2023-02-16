import { IAtm } from '@modules/atm/domain/models/IAtm';
import { IAtmRepository } from '@modules/atm/domain/repositories/IAtmRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { Knex } from 'knex';

class AtmRepository implements IAtmRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findAll(): Promise<Array<IAtm>> {
    return await this.ormRepository('atm').select('*');
  }

  public async findById(id: string): Promise<IAtm | undefined> {
    return await this.ormRepository('atm').select('*').where('id', id).first();
  }

  public async findByIdentification(identification: string): Promise<IAtm | undefined> {
    return await this.ormRepository('atm').select('*').where('identification', identification).first();
  }

  public async create(atm: Partial<IAtm>): Promise<IAtm> {
    const [atmCreated] = await this.ormRepository('atm').insert(atm).returning('*');

    return atmCreated;
  }

  public async update(id: string, atm: Partial<IAtm>): Promise<IAtm> {
    const [atmUpdated] = await this.ormRepository('atm').where({ id }).update(atm).returning('*');

    return atmUpdated;
  }
}

export default AtmRepository;
