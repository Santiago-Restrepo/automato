import { Test, TestingModule } from '@nestjs/testing';
import { DeleteStepService } from './delete-step.service';

describe('DeleteStepService', () => {
  let service: DeleteStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteStepService],
    }).compile();

    service = module.get<DeleteStepService>(DeleteStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
