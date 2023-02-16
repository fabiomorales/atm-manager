import { IAtm } from '@modules/atm/domain/models/IAtm';
import { IMovement } from '@modules/atm/domain/models/IMovement';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

declare module 'knex/types/tables' {
  interface Tables {
    customer: ICustomer;
    atm: IAtm;
    movement: IMovement;
  }
}
