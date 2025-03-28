import { Test, TestingModule } from '@nestjs/testing';
import { RunTriggerService } from './services/run-trigger.service';

describe('RunTriggerService', () => {
  let service: RunTriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunTriggerService],
    }).compile();

    service = module.get<RunTriggerService>(RunTriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
