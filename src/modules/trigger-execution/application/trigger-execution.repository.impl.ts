import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TriggerExecution } from '../domain/trigger-execution.entity';
import { TriggerExecutionRepository } from '../domain/trigger-execution.repository';

@Injectable()
export class TriggerExecutionRepositoryImpl
  extends Repository<TriggerExecution>
  implements TriggerExecutionRepository
{
  constructor(private datasource: DataSource) {
    super(TriggerExecution, datasource.createEntityManager());
  }
}
