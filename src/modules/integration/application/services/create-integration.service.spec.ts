import { Test, TestingModule } from '@nestjs/testing';
import { CreateIntegrationService } from './create-integration.service';

describe('CreateIntegrationService', () => {
  let service: CreateIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateIntegrationService],
    }).compile();

    service = module.get<CreateIntegrationService>(CreateIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
