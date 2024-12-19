import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';
import { FlowIntegrationRepository } from '../../domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/entities/flow-integration.entity';
import { FlowIntegrationMapper } from '../mappers/flow-integration.mapper';

@Injectable()
export class FlowIntegrationRepositoryImpl
  implements FlowIntegrationRepository
{
  private repository: Repository<FlowIntegrationOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(FlowIntegrationOrmEntity);
  }

  async findByFlowId(flowId: number): Promise<FlowIntegration[]> {
    const ormEntites = await this.repository.find({
      relations: ['integration'],
      where: {
        flowId,
      },
    });

    return ormEntites.map(FlowIntegrationMapper.toDomain);
  }
}
