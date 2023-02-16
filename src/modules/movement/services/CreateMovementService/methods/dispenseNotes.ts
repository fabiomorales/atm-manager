import AppError from '@shared/errors/AppError';
import { BillType, INotes, NotesUsedType } from './interfaces';

export const dispenseNotes = (value: number, notes: INotes): Partial<NotesUsedType> => {
  const notesUsed: Partial<NotesUsedType> = {
    hundred_bill: 0,
    fifty_bill: 0,
    twenty_bill: 0,
    ten_bill: 0,
  };

  const billTypes: Array<BillType> = [
    { type: 'hundred_bill', value: 100 },
    { type: 'fifty_bill', value: 50 },
    { type: 'twenty_bill', value: 20 },
    { type: 'ten_bill', value: 10 },
  ];

  for (const billType of billTypes) {
    const { type, value: billValue } = billType;
    const quantity = notes[type].quantity;

    if (value >= billValue && quantity > 0) {
      const numNotes = Math.floor(value / billValue);

      if (numNotes <= quantity) {
        notesUsed[type] = numNotes;
        value = value % (numNotes * billValue);
      } else {
        notesUsed[type] = quantity;
        value -= quantity * billValue;
      }
    }
  }

  if (value > 0) {
    throw new AppError('Quantidade de notas disponíveis não atende ao valor desejado', 401);
  }

  return notesUsed;
};
