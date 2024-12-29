import { Inject, Injectable } from '@nestjs/common';
import { FlowIntegrationRepository } from '../../../integration/domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/flow-integration.entity';

@Injectable()
export class FlowIntegrationService {
  constructor(
    @Inject('FlowIntegrationRepository')
    private readonly flowIntegrationRepository: FlowIntegrationRepository,
  ) {}

  async getFlowIntegrations(flowId: number): Promise<FlowIntegration[]> {
    return this.flowIntegrationRepository.findByFlowId(flowId);
  }
}
