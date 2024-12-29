import { Test, TestingModule } from '@nestjs/testing';
import { GetTriggerService } from './get-trigger.service';

describe('GetTriggerService', () => {
  let service: GetTriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTriggerService],
    }).compile();

    service = module.get<GetTriggerService>(GetTriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
