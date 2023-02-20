import { ICreateAtm } from '@modules/atm/domain/models/ICreateAtm';
import { validation } from '@shared/infra/http/middlewares/ValidationRequest';
import * as yup from 'yup';

export const createValidation = validation(getSchema => ({
  body: getSchema<ICreateAtm>(
    yup.object().shape({
      identification: yup.string().required().min(2),
      qtd_ten_bill: yup.number().required(),
      qtd_twenty_bill: yup.number().required(),
      qtd_fifty_bill: yup.number().required(),
      qtd_hundred_bill: yup.number().required(),
    }),
  ),
}));
