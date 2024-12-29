import { Test, TestingModule } from '@nestjs/testing';
import { DeleteIntegrationService } from './delete-integration.service';

describe('DeleteIntegrationService', () => {
  let service: DeleteIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteIntegrationService],
    }).compile();

    service = module.get<DeleteIntegrationService>(DeleteIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
