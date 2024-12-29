import { Test, TestingModule } from '@nestjs/testing';
import { GetIntegrationService } from './get-integration.service';

describe('GetIntegrationService', () => {
  let service: GetIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetIntegrationService],
    }).compile();

    service = module.get<GetIntegrationService>(GetIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
