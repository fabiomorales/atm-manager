import { ICreateAtm } from '@modules/atm/domain/models/ICreateAtm';
import CreateAtmService from '@modules/atm/services/CreateAtmService/CreateAtmService';
import ListAtmService from '@modules/atm/services/ListAtmService/ListAtmService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AtmController {
  public async list(_request: Request, response: Response): Promise<Response> {
    const listAtm = container.resolve(ListAtmService);

    const atms = await listAtm.execute();

    return response.json(atms);
  }

  public async create(request: Request<unknown, unknown, ICreateAtm>, response: Response): Promise<Response> {
    const { identification, qtd_fifty_bill, qtd_hundred_bill, qtd_ten_bill, qtd_twenty_bill } = request.body;

    const createAtm = container.resolve(CreateAtmService);

    const atm = await createAtm.execute({
      identification,
      qtd_fifty_bill,
      qtd_hundred_bill,
      qtd_ten_bill,
      qtd_twenty_bill,
    });

    return response.json(atm);
  }
}
