import { IAtm } from '../models/IAtm';

export interface IAtmRepository {
  findById(id: string): Promise<IAtm | undefined>;
  findAll(): Promise<Array<IAtm>>;
  findByIdentification(identification: string): Promise<IAtm | undefined>;
  create(atm: Partial<IAtm>): Promise<IAtm>;
  update(id: string, atm: Partial<IAtm>): Promise<IAtm>;
}
