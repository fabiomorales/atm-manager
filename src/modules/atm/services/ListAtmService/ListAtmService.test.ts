import { IAtmRepository } from '@modules/atm/domain/repositories/IAtmRepository';
import ListAtmService from './ListAtmService';

describe('ListAtmService', () => {
  let listAtmService: ListAtmService;
  let atmRepository: IAtmRepository;

  beforeEach(() => {
    atmRepository = {
      findByIdentification: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<IAtmRepository>;

    listAtmService = new ListAtmService(atmRepository);
  });

  it('should return all ATMs', async () => {
    const atms = [
      {
        id: 'a7a884e2-c084-4e1c-abac-3b85ec96fb67',
        identification: 'ATM 01',
        qtd_ten_bill: 1000,
        qtd_twenty_bill: 500,
        qtd_fifty_bill: 200,
        qtd_hundred_bill: 100,
        total_bill: 25000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
      {
        id: 'c24e18f5-5c99-4d7d-a619-a0e94942abdc',
        identification: 'ATM 02',
        qtd_ten_bill: 500,
        qtd_twenty_bill: 1000,
        qtd_fifty_bill: 200,
        qtd_hundred_bill: 50,
        total_bill: 52500,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ];

    jest.spyOn(atmRepository, 'findAll').mockResolvedValueOnce(atms);

    const result = await listAtmService.execute();

    expect(result).toEqual(atms);
  });

  it('should return an error if ATM throws an error', async () => {
    const errorMessage = 'Erro inesperado';
    jest.spyOn(atmRepository, 'findAll').mockRejectedValue(new Error(errorMessage));

    const result = await listAtmService.execute();

    expect(result).toEqual(new Error(errorMessage));
  });
});
