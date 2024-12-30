import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStepService } from './update-step.service';

describe('UpdateStepService', () => {
  let service: UpdateStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateStepService],
    }).compile();

    service = module.get<UpdateStepService>(UpdateStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
