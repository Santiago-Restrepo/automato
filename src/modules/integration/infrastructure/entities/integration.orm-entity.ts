import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import FlowIntegrationOrmEntity from 'src/modules/flow-integration/infrastructure/entities/flow-integration.orm-entity';
import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

@Entity({
  name: 'integrations',
})
export default class IntegrationOrmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: ClientKeys;

  @OneToMany(
    () => FlowIntegrationOrmEntity,
    (flowIntegration) => flowIntegration.integration,
  )
  flowIntegrations: FlowIntegrationOrmEntity[];
}
