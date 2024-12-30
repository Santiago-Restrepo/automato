import { Inject, Injectable } from '@nestjs/common';
import { FlowIntegrationRepository } from 'src/modules/integration/domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/flow-integration.entity';
import { CreateFlowIntegrationDto } from '../dtos/create-flow-integration.dto';

@Injectable()
export class CreateFlowIntegrationService {
  constructor(
    @Inject('FlowIntegrationRepository')
    private readonly flowIntegrationRepository: FlowIntegrationRepository,
  ) {}

  async createFlowIntegration(
    createFlowIntegrationDto: CreateFlowIntegrationDto,
  ): Promise<FlowIntegration> {
    return this.flowIntegrationRepository.create(createFlowIntegrationDto);
  }
}
