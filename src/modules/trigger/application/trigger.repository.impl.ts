import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Trigger } from '../domain/trigger.entity';
import { TriggerRepository } from '../domain/trigger.repository';

@Injectable()
export class TriggerRepositoryImpl
  extends Repository<Trigger>
  implements TriggerRepository
{
  constructor(private datasource: DataSource) {
    super(Trigger, datasource.createEntityManager());
  }
}
