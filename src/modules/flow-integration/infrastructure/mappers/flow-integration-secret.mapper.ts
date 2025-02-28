import { EncryptionService } from 'src/modules/encryption/application/encryption.service';
import { FlowIntegrationSecret } from '../../domain/flow-integration-secret.entity';
import FlowIntegrationSecretOrmEntity from '../entities/flow-integration-secret.orm-entity';

export class FlowIntegrationSecretMapper {
  static toDomain(
    entity: FlowIntegrationSecretOrmEntity,
    encryptionService: EncryptionService,
  ): FlowIntegrationSecret {
    const decryptedSecret = encryptionService.decrypt(entity.value);
    console.log(decryptedSecret);

    return new FlowIntegrationSecret(
      entity.id,
      entity.flowIntegrationId,
      entity.key,
      decryptedSecret,
    );
  }

  static toOrm(
    domain: FlowIntegrationSecret,
    encryptionService: EncryptionService,
  ): FlowIntegrationSecretOrmEntity {
    const encryptedSecret = encryptionService.encrypt(domain.value);
    const flowIntegrationSecret = new FlowIntegrationSecretOrmEntity();
    flowIntegrationSecret.id = domain.id;
    flowIntegrationSecret.flowIntegrationId = domain.flowIntegrationId;
    flowIntegrationSecret.key = domain.key;
    flowIntegrationSecret.value = encryptedSecret;
    return flowIntegrationSecret;
  }
}
