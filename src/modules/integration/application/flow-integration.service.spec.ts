import { Test, TestingModule } from '@nestjs/testing';
import { FlowIntegrationService } from '../../flow-integration/application/services/flow-integration.service';

describe('FlowIntegrationService', () => {
  let service: FlowIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowIntegrationService],
    }).compile();

    service = module.get<FlowIntegrationService>(FlowIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
