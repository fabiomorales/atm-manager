import { ICreateMovement } from '@modules/movement/domain/models/ICreateMovement';
import { IListMovementByCustomer } from '@modules/movement/domain/models/IListMovementByCustomer';
import { validation } from '@shared/infra/http/middlewares/ValidationRequest';
import * as yup from 'yup';

export const createValidation = validation(getSchema => ({
  body: getSchema<ICreateMovement>(
    yup.object().shape({
      customerId: yup.string().uuid().required(),
      atmId: yup.string().uuid().required(),
      value: yup.number().required(),
    }),
  ),
}));

export const showValidation = validation(getSchema => ({
  params: getSchema<IListMovementByCustomer>(
    yup.object().shape({
      customerId: yup.string().uuid().required(),
    }),
  ),
}));
