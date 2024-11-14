import { Test, TestingModule } from '@nestjs/testing';
import { RunStepExecutionService } from '../../step-execution/application/run-step-execution.service';

describe('StepService', () => {
  let service: RunStepExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunStepExecutionService],
    }).compile();

    service = module.get<RunStepExecutionService>(RunStepExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
