import { IAtm } from './IAtm';

export interface IUpdateAtm extends Partial<IAtm> {
  id: string;
  qtd_ten_bill: number;
  qtd_twenty_bill: number;
  qtd_fifty_bill: number;
  qtd_hundred_bill: number;
  identification?: string;
}
