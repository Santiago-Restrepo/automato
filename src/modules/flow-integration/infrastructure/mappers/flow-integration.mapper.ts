import { FlowIntegration } from '../../domain/flow-integration.entity';
import FlowIntegrationOrmEntity from '../entities/flow-integration.orm-entity';

export class FlowIntegrationMapper {
  static toDomain(entity: FlowIntegrationOrmEntity): FlowIntegration {
    return new FlowIntegration(
      entity.id,
      entity.integrationId,
      entity.flowVersionId,
      entity.clientEmail,
      entity.privateKey,
      entity.clientId,
      entity.clientSecret,
      entity.apiKey,
      entity.integration?.name,
    );
  }

  static toOrm(domain: FlowIntegration): FlowIntegrationOrmEntity {
    const flowIntegration = new FlowIntegrationOrmEntity();
    flowIntegration.id = domain.id;
    flowIntegration.integrationId = domain.integrationId;
    flowIntegration.flowVersionId = domain.flowVersionId;
    flowIntegration.clientEmail = domain.clientEmail;
    flowIntegration.privateKey = domain.privateKey;
    flowIntegration.clientId = domain.clientId;
    flowIntegration.clientSecret = domain.clientSecret;
    flowIntegration.apiKey = domain.apiKey;
    return flowIntegration;
  }
}
