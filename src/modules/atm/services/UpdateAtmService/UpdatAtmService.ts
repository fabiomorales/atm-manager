import { IUpdateAtm } from '@modules/atm/domain/models/IUpdateAtm';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAtm } from '../../domain/models/IAtm';
import { IAtmRepository } from '../../domain/repositories/IAtmRepository';

@injectable()
class CreateAtmService {
  constructor(
    @inject('AtmRepository')
    private atmRepository: IAtmRepository,
  ) {}

  public async execute({
    id,
    qtd_fifty_bill,
    qtd_hundred_bill,
    qtd_ten_bill,
    qtd_twenty_bill,
  }: IUpdateAtm): Promise<IAtm> {
    const existAtmIdentification = await this.atmRepository.findById(id);

    if (existAtmIdentification) {
      throw new AppError('Já existe um ATM com essa identificação', 401);
    }

    const atmUpdated = await this.atmRepository.update(id, {
      qtd_fifty_bill,
      qtd_hundred_bill,
      qtd_ten_bill,
      qtd_twenty_bill,
    });

    return atmUpdated;
  }
}

export default CreateAtmService;
