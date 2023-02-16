import { IMovement } from '../models/IMovement';

export interface IMovementRepository {
  findAll(): Promise<Array<IMovement>>;
  findById(id: string): Promise<IMovement | undefined>;
  create(movement: Partial<IMovement>): Promise<IMovement>;
  update(id: string, movement: Partial<IMovement>): Promise<IMovement>;
  delete(id: string): Promise<void>;
  findAllByCustomerId(customerId: string): Promise<Array<IMovement>>;
}
