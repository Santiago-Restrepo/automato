import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import Integration from './integration.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

@Entity()
export default class FlowIntegration extends BaseEntity {
  @Column({ type: 'int' })
  integrationId: number;

  @Column({ type: 'int' })
  flowId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clientEmail: string;

  @Column({ type: 'json', nullable: true })
  privateKey: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clientId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clientSecret: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  apiKey: string;

  @ManyToOne(() => Integration, (integration) => integration.flowIntegrations)
  integration: Integration;

  @ManyToOne(() => Flow, (flow) => flow.flowIntegrations)
  flow: Flow;
}
