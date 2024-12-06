import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FlowIntegration from '../domain/flow-integration.entity';
import { FlowIntegrationRepository } from '../domain/flow-integration.repository';

@Injectable()
export class FlowIntegrationRepositoryImpl
  extends Repository<FlowIntegration>
  implements FlowIntegrationRepository
{
  constructor(private datasource: DataSource) {
    super(FlowIntegration, datasource.createEntityManager());
  }
}
