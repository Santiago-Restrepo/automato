import { Test, TestingModule } from '@nestjs/testing';
import { GetStepService } from './get-step.service';

describe('GetStepService', () => {
  let service: GetStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetStepService],
    }).compile();

    service = module.get<GetStepService>(GetStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
