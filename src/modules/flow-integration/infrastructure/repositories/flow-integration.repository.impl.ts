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
    private encryptionService: EncryptionService, // Inject the encryption service
  ) {
    this.repository = this.datasource.getRepository(FlowIntegrationOrmEntity);
  }

  async findByFlowId(flowId: string): Promise<FlowIntegration[]> {
    const ormEntities = await this.repository.find({
      relations: ['integration'],
      where: { flowId },
    });

    return ormEntities.map((ormEntity) => {
      const decryptedSecret = this.encryptionService.decrypt(
        ormEntity.encryptedSecret,
      );
      return FlowIntegrationMapper.toDomain(
        ormEntity,
        JSON.parse(decryptedSecret as string),
      );
    });
  }

  create(
    flowIntegration: Pick<
      FlowIntegration,
      'integrationId' | 'flowId' | 'integrationName' | 'credentials'
    > &
      Partial<FlowIntegration>,
  ): Promise<FlowIntegration> {
    const flowIntegrationToSave = FlowIntegration.create(flowIntegration);
    return this.save(flowIntegrationToSave);
  }

  async save(flowIntegration: FlowIntegration): Promise<FlowIntegration> {
    const encryptedSecret = this.encryptionService.encrypt(
      JSON.stringify(flowIntegration.credentials),
    );
    const ormEntity = FlowIntegrationMapper.toOrm(
      flowIntegration,
      encryptedSecret,
    );
    const savedEntity = await this.repository.save(ormEntity);
    return FlowIntegrationMapper.toDomain(
      savedEntity,
      flowIntegration.credentials,
    );
  }

  async update(
    id: number,
    flowIntegration: { integrationName: ClientKeys } & Partial<FlowIntegration>,
  ): Promise<FlowIntegration> {
    const flowIntegrationToUpdate = await this.repository.findOneBy({ id });

    if (!flowIntegrationToUpdate)
      throw new NotFoundException(`FlowIntegration with id ${id} not found`);

    // Encrypt the updated secret field
    const updatedFlowIntegration = {
      ...flowIntegrationToUpdate,
      ...flowIntegration,
      credentials: flowIntegration.credentials || {},
    };

    return this.save(updatedFlowIntegration);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
