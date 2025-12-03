import { Test, TestingModule } from '@nestjs/testing';
import { UtilizadoresController } from './utilizadores.controller';
import { UtilizadoresService } from './utilizadores.service';

describe('UtilizadoresController', () => {
  let controller: UtilizadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilizadoresController],
      providers: [UtilizadoresService],
    }).compile();

    controller = module.get<UtilizadoresController>(UtilizadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});