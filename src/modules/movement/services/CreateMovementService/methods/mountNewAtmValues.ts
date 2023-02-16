import { IAtm } from '@modules/atm/domain/models/IAtm';
import { NotesUsedType } from './interfaces';

export const mountNewAtmValues = (atm: IAtm, notesUsed: Partial<NotesUsedType>): Partial<IAtm> => {
  const atmNotes: Partial<IAtm> = {
    qtd_ten_bill: atm.qtd_ten_bill - (notesUsed?.ten_bill ?? 0),
    qtd_twenty_bill: atm.qtd_twenty_bill - (notesUsed?.twenty_bill ?? 0),
    qtd_fifty_bill: atm.qtd_fifty_bill - (notesUsed?.fifty_bill ?? 0),
    qtd_hundred_bill: atm.qtd_hundred_bill - (notesUsed.hundred_bill ?? 0),
  };

  const value_ten_bill = atmNotes?.qtd_ten_bill ? atmNotes?.qtd_ten_bill * 10 : 0;
  const value_twenty_bill = atmNotes?.qtd_twenty_bill ? atmNotes?.qtd_twenty_bill * 20 : 0;
  const value_fifty_bill = atmNotes?.qtd_fifty_bill ? atmNotes?.qtd_fifty_bill * 50 : 0;
  const value_hundred_bill = atmNotes?.qtd_hundred_bill ? atmNotes?.qtd_hundred_bill * 100 : 0;

  atmNotes.total_bill = value_ten_bill + value_twenty_bill + value_fifty_bill + value_hundred_bill;

  return atmNotes;
};
