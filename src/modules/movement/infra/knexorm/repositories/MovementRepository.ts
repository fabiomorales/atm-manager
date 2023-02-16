import { IMovement } from '@modules/movement/domain/models/IMovement';
import { IMovementRepository } from '@modules/movement/domain/repositories/IMovementRepository';
import { knexormHelper } from '@shared/infra/knexorm';
import { Knex } from 'knex';

class MovementRepository implements IMovementRepository {
  private ormRepository: Knex;

  constructor() {
    this.ormRepository = knexormHelper.client;
  }

  public async findAll(): Promise<Array<IMovement>> {
    return await this.ormRepository('movement').select('*');
  }

  public async findById(id: string): Promise<IMovement | undefined> {
    return await this.ormRepository('movement').select('*').where('id', id).first();
  }

  public async findAllByCustomerId(customerId: string): Promise<Array<IMovement>> {
    return await this.ormRepository('movement').select('*').where('customer_id', customerId);
  }

  public async create({
    atm_id,
    customer_id,
    type_movement,
    description,
    value,
  }: Partial<IMovement>): Promise<IMovement> {
    const [movement] = await this.ormRepository('movement')
      .insert({
        atm_id,
        customer_id,
        type_movement,
        description,
        value,
      })
      .returning('*');

    return movement;
  }

  public async update(id: string, movement: Partial<IMovement>): Promise<IMovement> {
    const [movementUpdated] = await this.ormRepository('movement').where({ id }).update(movement).returning('*');

    return movementUpdated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository('movement').where({ id }).del();
  }
}

export default MovementRepository;
