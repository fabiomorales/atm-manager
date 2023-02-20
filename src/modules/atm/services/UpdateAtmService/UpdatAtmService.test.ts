import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { IUpdateAtm } from '../../domain/models/IUpdateAtm';
import { IAtmRepository } from '../../domain/repositories/IAtmRepository';
import UpdateAtmService from './UpdatAtmService';

describe('UpdateAtmService', () => {
  let updateAtmService: UpdateAtmService;
  let atmRepository: jest.Mocked<IAtmRepository>;
  const atmUpdateParams: IUpdateAtm = {
    id: 'a7a884e2-c084-4e1c-abac-3b85ec96fb67',
    identification: 'ATM Teste',
    qtd_ten_bill: 2000,
    qtd_twenty_bill: 1000,
    qtd_fifty_bill: 400,
    qtd_hundred_bill: 200,
  };
  const mockFindById = () =>
    jest.spyOn(atmRepository, 'findById').mockResolvedValueOnce({
      id: 'a7a884e2-c084-4e1c-abac-3b85ec96fb67',
      identification: 'ATM Teste',
      qtd_ten_bill: 1000,
      qtd_twenty_bill: 500,
      qtd_fifty_bill: 200,
      qtd_hundred_bill: 100,
      total_bill: 40000,
      created_at: new Date('2023-02-17 12:22:29.403 -0300'),
      updated_at: new Date('2023-02-17 12:22:29.403 -0300'),
      deleted_at: new Date(),
    });

  beforeEach(() => {
    atmRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findByIdentification: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<IAtmRepository>;

    updateAtmService = new UpdateAtmService(atmRepository);
  });

  it('should update ATM', async () => {
    mockFindById();

    const result = await updateAtmService.execute(atmUpdateParams);

    expect(result).toEqual(StatusCodes.OK);
  });

  it('should throw an error if ATM with same id not exists', async () => {
    const result = await updateAtmService.execute(atmUpdateParams);

    expect(result).toEqual(new AppError('Não Existe ATM com esse ID', StatusCodes.NOT_FOUND));
  });

  it('should return an error if ATM throws an error', async () => {
    mockFindById();

    const errorMessage = 'Erro inesperado';
    jest.spyOn(atmRepository, 'update').mockRejectedValue(new Error(errorMessage));

    const result = await updateAtmService.execute(atmUpdateParams);

    expect(result).toEqual(new Error(errorMessage));
  });
});
