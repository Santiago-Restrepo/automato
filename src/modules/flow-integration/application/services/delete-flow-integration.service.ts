import { Inject, Injectable } from '@nestjs/common';
import { FlowIntegrationRepository } from 'src/modules/integration/domain/ports/flow-integration.repository';

@Injectable()
export class DeleteFlowIntegrationService {
  constructor(
    @Inject('FlowIntegrationRepository')
    private readonly flowIntegrationRepository: FlowIntegrationRepository,
  ) {}

  async deleteFlowIntegration(id: number): Promise<void> {
    return this.flowIntegrationRepository.delete(id);
  }
}
