import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { TriggerOrmEntity } from '../entities/trigger.orm-entity';
import { TriggerRepository } from '../../domain/ports/trigger.repository';
import { TriggerMapper } from '../mappers/trigger.mapper';
import { Trigger } from '../../domain/entities/trigger.entity';

@Injectable()
export class TriggerRepositoryImpl implements TriggerRepository {
  private repository: Repository<TriggerOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(TriggerOrmEntity);
  }

  async findOneByOrFail(query: Partial<Trigger>): Promise<Trigger> {
    const trigger = await this.repository.findOneByOrFail(
      query as FindOptionsWhere<TriggerOrmEntity>,
    );
    return TriggerMapper.toDomain(trigger);
  }
}
