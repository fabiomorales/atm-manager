import { calculateTotalBill } from './calculateTotalBill';
import { ICalculateTotalBillParams } from './interfaces';

describe('Method Calculate total bill', () => {
  const params: ICalculateTotalBillParams = {
    qtd_ten_bill: 2000,
    qtd_twenty_bill: 1000,
    qtd_fifty_bill: 400,
    qtd_hundred_bill: 200,
  };

  it('Calculate total notes', () => {
    const result = calculateTotalBill(params);

    expect(result).toEqual(80000);
  });
});
