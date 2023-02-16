import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  create(data: Partial<ICustomer>): Promise<ICustomer>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findByCpf(cpf: string): Promise<ICustomer | undefined>;
  findAll(): Promise<ICustomer[]>;
  update(id: string, customer: Partial<ICustomer>): Promise<ICustomer>;
}
