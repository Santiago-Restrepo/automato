import { Test, TestingModule } from '@nestjs/testing';
import { GetFlowIntegrationService } from '../../flow-integration/application/services/get-flow-integrations.service';

describe('FlowIntegrationService', () => {
  let service: GetFlowIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetFlowIntegrationService],
    }).compile();

    service = module.get<GetFlowIntegrationService>(GetFlowIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
