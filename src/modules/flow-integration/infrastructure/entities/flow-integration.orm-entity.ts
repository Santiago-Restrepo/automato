import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import IntegrationOrmEntity from 'src/modules/integration/infrastructure/entities/integration.orm-entity';

@Entity({
  name: 'flow_integrations',
})
@Index(['integrationId', 'flowId'], { unique: true })
export default class FlowIntegrationOrmEntity extends BaseEntity {
  @Column({ type: 'int' })
  integrationId: number;

  @Column({ type: 'varchar' })
  flowId: string;

  @Column({ type: 'json', nullable: true })
  encryptedSecret?: object | null;

  @ManyToOne(
    () => IntegrationOrmEntity,
    (integration) => integration.flowIntegrations,
  )
  integration?: IntegrationOrmEntity | null;

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.flowIntegrations)
  flow: FlowOrmEntity;
}
