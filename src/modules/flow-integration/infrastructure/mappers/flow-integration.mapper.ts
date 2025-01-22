import { FlowIntegration } from '../../domain/flow-integration.entity';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';

export class FlowIntegrationMapper {
  static toDomain(entity: FlowIntegrationOrmEntity): FlowIntegration {
    return new FlowIntegration(
      entity.id,
      entity.integrationId,
      entity.flowId,
      entity.encryptedSecret,
      entity.integration?.name,
    );
  }

  static toOrm(domain: FlowIntegration): FlowIntegrationOrmEntity {
    const flowIntegration = new FlowIntegrationOrmEntity();
    flowIntegration.id = domain.id;
    flowIntegration.integrationId = domain.integrationId;
    flowIntegration.flowId = domain.flowId;
    flowIntegration.encryptedSecret = domain.credentials;
    return flowIntegration;
  }
}
