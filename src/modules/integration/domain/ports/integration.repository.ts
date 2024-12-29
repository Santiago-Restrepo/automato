import { Integration } from '../entities/integration.entity';

export interface IntegrationRepository {
  create(integration: Pick<Integration, 'name'>): Promise<Integration>;
  save(integration: Integration): Promise<Integration>;
  findOne(query: Partial<Integration>): Promise<Integration | null>;
  findAll(): Promise<Integration[]>;
  delete(id: number): Promise<void>;
}
