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

  async findByFlowId(flowId: number): Promise<Step[]> {
    const ormEntities = await this.repository.find({
      relations: { parameters: true, function: true },
      where: { flowId },
      order: { order: 'ASC' },
    });
    return ormEntities.map((ormEntity) => StepMapper.toDomain(ormEntity));
  }

  create(step: Pick<Step, 'flowId' | 'order'> & Partial<Step>): Promise<Step> {
    const stepToSave = Step.create(step);
    return this.save(stepToSave);
  }

  async save(step: Step): Promise<Step> {
    const ormEntity = StepMapper.toOrm(step);
    const savedEntity = await this.repository.save(ormEntity);
    return StepMapper.toDomain(savedEntity);
  }

  async update(id: number, step: Partial<Step>): Promise<Step> {
    const stepToUpdate = await this.findById(id);
    if (!stepToUpdate) {
      throw new Error(`Step with id ${id} not found`);
    }
    const updatedStep = { ...stepToUpdate, ...step };
    const ormEntity = StepMapper.toOrm(updatedStep);
    const savedEntity = await this.repository.save(ormEntity);
    return StepMapper.toDomain(savedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
