import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IFindCustomer } from '@modules/customers/domain/models/IFindCustomer';
import { validation } from '@shared/infra/http/middlewares/ValidationRequest';
import * as yup from 'yup';

export const createValidation = validation(getSchema => ({
  body: getSchema<ICreateCustomer>(
    yup.object().shape({
      fisrt_name: yup.string().required().min(2),
      last_name: yup.string().required().min(2),
      email: yup.string().required().email(),
      cpf: yup.string().required().min(11),
      balance: yup.number().required().min(2),
    }),
  ),
}));

export const showValidation = validation(getSchema => ({
  params: getSchema<IFindCustomer>(
    yup.object().shape({
      email: yup.string().required().email(),
    }),
  ),
}));
