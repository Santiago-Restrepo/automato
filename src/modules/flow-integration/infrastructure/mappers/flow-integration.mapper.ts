import { FlowIntegration } from '../../domain/flow-integration.entity';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';

export class FlowIntegrationMapper {
  static toDomain(
    entity: FlowIntegrationOrmEntity,
    decryptedSecret: object,
  ): FlowIntegration {
    return new FlowIntegration(
      entity.id,
      entity.integrationId,
      entity.flowId,
      decryptedSecret,
      entity.integration?.name,
    );
  }

  static toOrm(
    domain: FlowIntegration,
    encryptedSecret: Buffer,
  ): FlowIntegrationOrmEntity {
    const flowIntegration = new FlowIntegrationOrmEntity();
    flowIntegration.id = domain.id;
    flowIntegration.integrationId = domain.integrationId;
    flowIntegration.flowId = domain.flowId;
    flowIntegration.encryptedSecret = encryptedSecret;
    return flowIntegration;
  }
}
