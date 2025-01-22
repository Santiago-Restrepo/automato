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

  create(
    trigger: Pick<Trigger, 'isActive' | 'payloadKey' | 'flowId'> &
      Partial<Trigger>,
  ): Promise<Trigger> {
    const triggerToSave = Trigger.create(trigger);
    return this.save(triggerToSave);
  }

  async save(trigger: Trigger): Promise<Trigger> {
    const triggerToSave = TriggerMapper.toOrm(trigger);
    const savedEntity = await this.repository.save(triggerToSave);
    return TriggerMapper.toDomain(savedEntity);
  }

  async update(
    id: number,
    updateTriggerDto: Partial<Trigger>,
  ): Promise<Trigger> {
    const triggerToUpdate = await this.findOneByOrFail({ id });
    const updatedTrigger = { ...triggerToUpdate, ...updateTriggerDto };
    return this.save(updatedTrigger);
  }

  async findAll(): Promise<Trigger[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map((ormEntity) => TriggerMapper.toDomain(ormEntity));
  }

  async findOne(query: Partial<Trigger>): Promise<Trigger | null> {
    const ormEntity = await this.repository.findOneBy(
      query as FindOptionsWhere<TriggerOrmEntity>,
    );
    return ormEntity ? TriggerMapper.toDomain(ormEntity) : null;
  }
}
