import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import FlowIntegration from './flow-integration.entity';
import { ClientMap } from 'src/modules/client/application/clients/types/client-map.type';

@Entity()
export default class Integration extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: keyof ClientMap;

  @OneToMany(
    () => FlowIntegration,
    (flowIntegration) => flowIntegration.integration,
  )
  flowIntegrations: FlowIntegration[];
}
