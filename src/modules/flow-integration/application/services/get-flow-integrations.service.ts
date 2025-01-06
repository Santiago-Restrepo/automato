import { Inject, Injectable } from '@nestjs/common';
import { FlowIntegrationRepository } from '../../../integration/domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/flow-integration.entity';

@Injectable()
export class GetFlowIntegrationService {
  constructor(
    @Inject('FlowIntegrationRepository')
    private readonly flowIntegrationRepository: FlowIntegrationRepository,
  ) {}

  async getFlowIntegrations(flowVersionId: string): Promise<FlowIntegration[]> {
    return this.flowIntegrationRepository.findByFlowVersionId(flowVersionId);
  }
}
