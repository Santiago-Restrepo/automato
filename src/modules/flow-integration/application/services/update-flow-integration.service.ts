import { Inject, Injectable } from '@nestjs/common';
import { FlowIntegrationRepository } from 'src/modules/integration/domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/flow-integration.entity';
import { UpdateFlowIntegrationDto } from '../dtos/update-flow-integration.dto';

@Injectable()
export class UpdateFlowIntegrationService {
  constructor(
    @Inject('FlowIntegrationRepository')
    private readonly flowIntegrationRepository: FlowIntegrationRepository,
  ) {}

  async updateFlowIntegration(
    id: number,
    updateFlowIntegrationDto: UpdateFlowIntegrationDto,
  ): Promise<FlowIntegration> {
    return this.flowIntegrationRepository.update(id, updateFlowIntegrationDto);
  }
}
