import { EncryptionService } from 'src/modules/encryption/application/encryption.service';
import { FlowIntegration } from '../../domain/flow-integration.entity';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';
import { FlowIntegrationSecretMapper } from './flow-integration-secret.mapper';

export class FlowIntegrationMapper {
  static toDomain(
    entity: FlowIntegrationOrmEntity,
    encryptionService: EncryptionService,
  ): FlowIntegration {
    return new FlowIntegration(
      entity.id,
      entity.integrationId,
      entity.flowId,
      entity.secrets?.map((secret) =>
        FlowIntegrationSecretMapper.toDomain(secret, encryptionService),
      ),
      entity.integration?.name,
    );
  }

  static toOrm(
    domain: FlowIntegration,
    encryptionService: EncryptionService,
  ): FlowIntegrationOrmEntity {
    const flowIntegration = new FlowIntegrationOrmEntity();
    flowIntegration.id = domain.id;
    flowIntegration.integrationId = domain.integrationId;
    flowIntegration.flowId = domain.flowId;
    flowIntegration.secrets =
      domain.secrets?.map((secret) =>
        FlowIntegrationSecretMapper.toOrm(secret, encryptionService),
      ) || [];
    return flowIntegration;
  }
}
