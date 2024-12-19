import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import StepOrmEntity from '../entities/step.orm-entity';
import { StepRepository } from '../../domain/ports/step.repository';
import { Step } from '../../domain/entities/step.entity';
import { StepMapper } from '../mappers/step.mapper';

@Injectable()
export class StepRepositoryImpl implements StepRepository {
  private repository: Repository<StepOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(StepOrmEntity);
  }

  async findById(id: number): Promise<Step | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? StepMapper.toDomain(ormEntity) : null;
  }

  async save(step: Step): Promise<Step> {
    const ormEntity = StepMapper.toOrm(step);
    const savedEntity = await this.repository.save(ormEntity);
    return StepMapper.toDomain(savedEntity);
  }
}
