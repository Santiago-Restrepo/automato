import { Test, TestingModule } from '@nestjs/testing';
import { UpdateIntegrationService } from './update-integration.service';

describe('UpdateIntegrationService', () => {
  let service: UpdateIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateIntegrationService],
    }).compile();

    service = module.get<UpdateIntegrationService>(UpdateIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
