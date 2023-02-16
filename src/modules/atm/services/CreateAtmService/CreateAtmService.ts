import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAtm } from '../../domain/models/IAtm';
import { ICreateAtm } from '../../domain/models/ICreateAtm';
import { IAtmRepository } from '../../domain/repositories/IAtmRepository';
import { calculateTotalBill } from './methods/calculateTotalBill';

@injectable()
class CreateAtmService {
  constructor(
    @inject('AtmRepository')
    private atmRepository: IAtmRepository,
  ) {}

  public async execute(params: ICreateAtm): Promise<IAtm> {
    const existAtmIdentification = await this.atmRepository.findByIdentification(params.identification);

    if (existAtmIdentification) {
      throw new AppError('Já existe um ATM com essa identificação', 401);
    }

    const total_bill = calculateTotalBill(params);

    const atm = await this.atmRepository.create({ ...params, total_bill });

    return atm;
  }
}

export default CreateAtmService;
