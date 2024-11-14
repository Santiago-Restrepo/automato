import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import StepExecution from '../domain/step-execution.entity';
import { StepExecutionRepository } from '../domain/step-execution.repository';

@Injectable()
export class StepExecutionRepositoryImpl
  extends Repository<StepExecution>
  implements StepExecutionRepository
{
  constructor(private datasource: DataSource) {
    super(StepExecution, datasource.createEntityManager());
  }
}
