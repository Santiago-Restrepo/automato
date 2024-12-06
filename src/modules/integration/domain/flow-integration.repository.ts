import { FindManyOptions } from 'typeorm';
import FlowIntegration from './flow-integration.entity';

export interface FlowIntegrationRepository {
  find(options?: FindManyOptions<FlowIntegration>): Promise<FlowIntegration[]>;
}
