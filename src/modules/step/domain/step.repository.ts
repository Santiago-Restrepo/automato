import { DataSource, Repository } from 'typeorm';
import Step from './step.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StepRepository extends Repository<Step> {
  constructor(private datasource: DataSource) {
    super(Step, datasource.createEntityManager());
  }
}
