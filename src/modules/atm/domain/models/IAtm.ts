export interface IAtm {
  id: string;
  identification: string;
  qtd_ten_bill: number;
  qtd_twenty_bill: number;
  qtd_fifty_bill: number;
  qtd_hundred_bill: number;
  total_bill: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
