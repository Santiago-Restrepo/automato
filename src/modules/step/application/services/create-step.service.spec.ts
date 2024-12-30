import { Test, TestingModule } from '@nestjs/testing';
import { CreateStepService } from './create-step.service';

describe('CreateStepService', () => {
  let service: CreateStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateStepService],
    }).compile();

    service = module.get<CreateStepService>(CreateStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
