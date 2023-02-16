import { ICreateAtm } from '@modules/atm/domain/models/ICreateAtm';

export const calculateTotalBill = (params: ICreateAtm): number => {
  const total_bill =
    params.qtd_ten_bill * 10 + params.qtd_twenty_bill * 20 + params.qtd_fifty_bill * 50 + params.qtd_hundred_bill * 100;

  return total_bill;
};
