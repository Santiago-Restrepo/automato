import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import IntegrationOrmEntity from 'src/modules/integration/infrastructure/entities/integration.orm-entity';
import FlowIntegrationSecretOrmEntity from './flow-integration-secret.orm-entity';

@Entity({
  name: 'flow_integrations',
})
@Index(['integrationId', 'flowId'], { unique: true })
export default class FlowIntegrationOrmEntity extends BaseEntity {
  @Column({ type: 'int' })
  integrationId: number;

  @Column({ type: 'varchar' })
  flowId: string;

  @ManyToOne(
    () => IntegrationOrmEntity,
    (integration) => integration.flowIntegrations,
  )
  integration?: IntegrationOrmEntity | null;

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.flowIntegrations)
  flow: FlowOrmEntity;

  @OneToMany(
    () => FlowIntegrationSecretOrmEntity,
    (flowIntegrationSecret) => flowIntegrationSecret.flowIntegration,
    {
      cascade: true,
    },
  )
  secrets: FlowIntegrationSecretOrmEntity[];
}
