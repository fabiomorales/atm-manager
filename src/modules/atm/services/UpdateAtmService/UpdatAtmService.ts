import { IUpdateAtm } from '@modules/atm/domain/models/IUpdateAtm';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IAtmRepository } from '../../domain/repositories/IAtmRepository';
import { calculateTotalBill } from './methods/calculateTotalBill';

@injectable()
class UpdateAtmService {
  constructor(
    @inject('AtmRepository')
    private atmRepository: IAtmRepository,
  ) {}

  public async execute({
    id,
    identification,
    qtd_fifty_bill,
    qtd_hundred_bill,
    qtd_ten_bill,
    qtd_twenty_bill,
  }: IUpdateAtm): Promise<number | unknown> {
    try {
      const atmExists = await this.atmRepository.findById(id);

      if (!atmExists) {
        throw new AppError('Não Existe ATM com esse ID', StatusCodes.NOT_FOUND);
      }

      const total_bill = calculateTotalBill({ qtd_fifty_bill, qtd_hundred_bill, qtd_ten_bill, qtd_twenty_bill });

      await this.atmRepository.update(id, {
        identification,
        qtd_fifty_bill,
        qtd_hundred_bill,
        qtd_ten_bill,
        qtd_twenty_bill,
        total_bill,
      });

      return StatusCodes.OK;
    } catch (error) {
      return error;
    }
  }
}

export default UpdateAtmService;
