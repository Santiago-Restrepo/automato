import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';
import { FlowIntegrationRepository } from '../../../integration/domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/flow-integration.entity';
import { FlowIntegrationMapper } from '../mappers/flow-integration.mapper';
import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

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

  create(
    flowIntegration: Pick<
      FlowIntegration,
      'integrationId' | 'flowId' | 'integrationName'
    > &
      Partial<FlowIntegration>,
  ): Promise<FlowIntegration> {
    const flowIntegrationToSave = FlowIntegration.create(flowIntegration);
    return this.save(flowIntegrationToSave);
  }

  async save(flowIntegration: FlowIntegration): Promise<FlowIntegration> {
    const ormEntity = FlowIntegrationMapper.toOrm(flowIntegration);
    const savedEntity = await this.repository.save(ormEntity);
    return FlowIntegrationMapper.toDomain(savedEntity);
  }

  async update(
    id: number,
    flowIntegration: { integrationName: ClientKeys } & Partial<FlowIntegration>,
  ): Promise<FlowIntegration> {
    const flowIntegrationToUpdate = await this.repository.findOneBy({ id });

    if (!flowIntegrationToUpdate)
      throw new NotFoundException(`FlowIntegration with id ${id} not found`);

    const updatedFlowIntegration = {
      ...flowIntegrationToUpdate,
      ...flowIntegration,
    };

    return this.save(updatedFlowIntegration);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
