import { NotesUsedType } from './interfaces';

export const mountDescription = (identificationAtm: string, notes: Partial<NotesUsedType>): string => {
  const translateNote = {
    hundred_bill: 100,
    fifty_bill: 50,
    twenty_bill: 20,
    ten_bill: 10,
  };

  const result = Object.entries(notes).reduce((acc, [note, count]) => {
    if (count > 0) {
      const noteString = `${count} nota${count > 1 ? 's' : ''} de ${translateNote[note as keyof NotesUsedType]}`;
      return acc ? `${acc}, ${noteString}` : noteString;
    }
    return acc;
  }, '');

  return `${identificationAtm}, ${result}`;
};
