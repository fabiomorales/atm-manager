import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { ICreateAtm } from '../../domain/models/ICreateAtm';
import { IAtmRepository } from '../../domain/repositories/IAtmRepository';
import CreateAtmService from './CreateAtmService';

describe('CreateAtmService', () => {
  let createAtmService: CreateAtmService;
  let atmRepository: IAtmRepository;

  const params: ICreateAtm = {
    identification: 'ATM Teste',
    qtd_ten_bill: 2000,
    qtd_twenty_bill: 1000,
    qtd_fifty_bill: 400,
    qtd_hundred_bill: 200,
  };

  beforeEach(() => {
    atmRepository = {
      findByIdentification: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<IAtmRepository>;

    createAtmService = new CreateAtmService(atmRepository);
  });

  it('should create a new ATM', async () => {
    atmRepository.findByIdentification(params.identification);

    const result = await createAtmService.execute(params);

    expect(atmRepository.create).toHaveBeenCalledWith({
      ...params,
      total_bill: 80000,
    });
    expect(result).toBe(StatusCodes.CREATED);
  });

  it('should throw an error if ATM with same identification already exists', async () => {
    jest.spyOn(atmRepository, 'findByIdentification').mockResolvedValueOnce({
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

    const result = await createAtmService.execute(params);

    expect(result).toEqual(new AppError('Já existe um ATM com essa identificação', StatusCodes.CONFLICT));
  });

  it('should return an error if ATM throws an error', async () => {
    const errorMessage = 'Erro inesperado';
    jest.spyOn(atmRepository, 'findByIdentification').mockRejectedValue(new Error(errorMessage));

    const result = await createAtmService.execute(params);

    expect(result).toEqual(new Error(errorMessage));
  });
});
