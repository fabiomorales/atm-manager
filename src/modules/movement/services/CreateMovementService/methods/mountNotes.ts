import { IAtm } from '@modules/atm/domain/models/IAtm';
import { INotes } from './interfaces';

export const mountNotes = (atm: IAtm): INotes => {
  const notes: INotes = {
    hundred_bill: {
      value: 100,
      quantity: atm.qtd_hundred_bill,
    },
    fifty_bill: {
      value: 50,
      quantity: atm.qtd_fifty_bill,
    },
    twenty_bill: {
      value: 20,
      quantity: atm.qtd_twenty_bill,
    },
    ten_bill: {
      value: 10,
      quantity: atm.qtd_ten_bill,
    },
  };

  return notes;
};
