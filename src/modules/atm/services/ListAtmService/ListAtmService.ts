import { IAtm } from '@modules/atm/domain/models/IAtm';
import { IAtmRepository } from '@modules/atm/domain/repositories/IAtmRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAtmService {
  constructor(
    @inject('AtmRepository')
    private atmRepository: IAtmRepository,
  ) {}

  public async execute(): Promise<Array<IAtm>> {
    const atms = await this.atmRepository.findAll();

    return atms;
  }
}

export default ListAtmService;
