import { Test, TestingModule } from '@nestjs/testing';
import { UtilizadoresService } from './utilizadores.service';

describe('UtilizadoresService', () => {
  let service: UtilizadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilizadoresService],
    }).compile();

    service = module.get<UtilizadoresService>(UtilizadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
