export type ValueType = 10 | 20 | 50 | 100;

export type NotesType = { value: ValueType; quantity: number };

export interface INotes {
  hundred_bill: NotesType;
  fifty_bill: NotesType;
  twenty_bill: NotesType;
  ten_bill: NotesType;
}

export type NotesUsedType = { [key in keyof INotes]: number };

export type BillType = {
  type: keyof INotes;
  value: ValueType;
};
