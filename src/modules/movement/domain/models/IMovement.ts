import { IAtm } from '@modules/atm/domain/models/IAtm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export interface IMovement {
  id: string;
  type_movement: string;
  description: string;
  value: number;
  customer_id: ICustomer['id'];
  atm_id: IAtm['id'];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
