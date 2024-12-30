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

  @Column({ type: 'int' })
  flowId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clientEmail: string | null;

  @Column({ type: 'json', nullable: true })
  privateKey: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clientId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clientSecret: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  apiKey: string | null;

  @ManyToOne(
    () => IntegrationOrmEntity,
    (integration) => integration.flowIntegrations,
  )
  integration?: IntegrationOrmEntity | null;

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.flowIntegrations)
  flow: FlowOrmEntity;
}
