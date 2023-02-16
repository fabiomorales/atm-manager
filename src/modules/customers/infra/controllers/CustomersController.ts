import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IFindCustomer } from '@modules/customers/domain/models/IFindCustomer';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService/CreateCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService/ShowCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request<unknown, unknown, ICreateCustomer>, response: Response): Promise<Response> {
    const { cpf, email, fisrt_name, last_name, balance } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      cpf,
      email,
      fisrt_name,
      last_name,
      balance,
    });

    return response.json(customer);
  }

  public async show(request: Request<IFindCustomer>, response: Response): Promise<Response> {
    const { email } = request.params;

    const findCustomer = container.resolve(ShowCustomerService);

    const customer = await findCustomer.execute({
      email,
    });

    return response.json(customer);
  }
}
