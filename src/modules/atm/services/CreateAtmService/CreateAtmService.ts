import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICreateAtm } from '../../domain/models/ICreateAtm';
import { IAtmRepository } from '../../domain/repositories/IAtmRepository';
import { calculateTotalBill } from './methods/calculateTotalBill';

@injectable()
class CreateAtmService {
  constructor(
    @inject('AtmRepository')
    private atmRepository: IAtmRepository,
  ) {}

  public async execute(params: ICreateAtm): Promise<number | unknown> {
    try {
      const existAtmIdentification = await this.atmRepository.findByIdentification(params.identification);

      if (existAtmIdentification) {
        throw new AppError('Já existe um ATM com essa identificação', StatusCodes.CONFLICT);
      }

      const total_bill = calculateTotalBill(params);

      await this.atmRepository.create({ ...params, total_bill });

      return StatusCodes.CREATED;
    } catch (error) {
      return error;
    }
  }
}

export default CreateAtmService;
