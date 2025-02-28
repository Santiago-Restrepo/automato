import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';
import { FlowIntegrationRepository } from '../../../integration/domain/ports/flow-integration.repository';
import { FlowIntegration } from '../../domain/flow-integration.entity';
import { FlowIntegrationMapper } from '../mappers/flow-integration.mapper';
import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';
import { EncryptionService } from 'src/modules/encryption/application/encryption.service';

@Injectable()
export class FlowIntegrationRepositoryImpl
  implements FlowIntegrationRepository
{
  private repository: Repository<FlowIntegrationOrmEntity>;

  constructor(
    private datasource: DataSource,
    private encryptionService: EncryptionService,
  ) {
    this.repository = this.datasource.getRepository(FlowIntegrationOrmEntity);
  }

  async findByFlowId(flowId: string): Promise<FlowIntegration[]> {
    const ormEntities = await this.repository.find({
      relations: ['integration', 'secrets'],
      where: { flowId },
    });

    return ormEntities.map((ormEntity) =>
      FlowIntegrationMapper.toDomain(ormEntity, this.encryptionService),
    );
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
    const ormEntity = FlowIntegrationMapper.toOrm(
      flowIntegration,
      this.encryptionService,
    );
    const savedEntity = await this.repository.save(ormEntity);
    return FlowIntegrationMapper.toDomain(savedEntity, this.encryptionService);
  }

  async update(
    id: number,
    flowIntegration: { integrationName: ClientKeys } & Partial<FlowIntegration>,
  ): Promise<FlowIntegration> {
    const flowIntegrationFound = await this.repository.findOne({
      relations: ['secrets'],
      where: { id },
    });
    if (!flowIntegrationFound)
      throw new NotFoundException(`FlowIntegration with id ${id} not found`);
    const flowIntegrationToUpdate = FlowIntegrationMapper.toDomain(
      flowIntegrationFound,
      this.encryptionService,
    );

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
