import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import FlowIntegrationOrmEntity from './flow-integration.orm-entity';
import { ClientMap } from 'src/modules/client/application/clients/types/client-map.type';

@Entity({
  name: 'integrations',
})
export default class IntegrationOrmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: keyof ClientMap;

  @OneToMany(
    () => FlowIntegrationOrmEntity,
    (flowIntegration) => flowIntegration.integration,
  )
  flowIntegrations: FlowIntegrationOrmEntity[];
}
