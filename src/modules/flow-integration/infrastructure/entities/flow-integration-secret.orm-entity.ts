import { Column, Entity, ManyToOne } from 'typeorm';
import FlowIntegrationOrmEntity from './flow-integration.orm-entity';
import UUIDBaseEntity from 'src/shared/uuid-base.entity';
@Entity({
  name: 'flow_integration_secrets',
})
export default class FlowIntegrationSecretOrmEntity extends UUIDBaseEntity {
  @Column({ type: 'int' })
  flowIntegrationId: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'bytea' })
  value: Buffer;

  @ManyToOne(
    () => FlowIntegrationOrmEntity,
    (flowIntegration) => flowIntegration.secrets,
  )
  flowIntegration: FlowIntegrationOrmEntity;
}
