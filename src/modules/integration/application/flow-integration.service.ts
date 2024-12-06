import { Inject, Injectable } from '@nestjs/common';
import { FlowIntegrationRepository } from '../domain/flow-integration.repository';
import FlowIntegration from '../domain/flow-integration.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

@Injectable()
export class FlowIntegrationService {
  constructor(
    @Inject('FlowIntegrationRepository')
    private readonly flowIntegrationRepository: FlowIntegrationRepository,
  ) {}

  async getFlowIntegrations(flow: Flow): Promise<FlowIntegration[]> {
    return this.flowIntegrationRepository.find({
      relations: { integration: true },
      where: { flowId: flow.id },
    });
  }
}
