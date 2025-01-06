import { DataSource, Repository } from 'typeorm';
import FlowOrmEntity from '../entities/flow.orm-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../../domain/ports/flow.repository';
import { FlowVersion } from '../../domain/entities/flow.entity';
import { FlowMapper } from '../mappers/flow.mapper';

@Injectable()
export class FlowRepositoryImpl implements FlowRepository {
  private repository: Repository<FlowOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(FlowOrmEntity);
  }

  async findAll(): Promise<FlowVersion[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map((ormEntity) => FlowMapper.toDomain(ormEntity));
  }

  async findOne(query: Partial<FlowVersion>): Promise<FlowVersion | null> {
    const ormEntity = await this.repository.findOne({
      where: query as any,
      relations: { steps: true },
      order: { version: 'DESC' },
    });
    return ormEntity ? FlowMapper.toDomain(ormEntity) : null;
  }

  create(flow: Partial<FlowVersion>): Promise<FlowVersion> {
    const flowToSave = FlowVersion.create(flow);
    return this.save(flowToSave);
  }

  async save(flow: FlowVersion): Promise<FlowVersion> {
    const ormEntity = FlowMapper.toOrm(flow);
    const savedEntity = await this.repository.save(ormEntity);
    return FlowMapper.toDomain(savedEntity);
  }

  async update(
    flowId: number,
    flow: Partial<FlowVersion>,
  ): Promise<FlowVersion> {
    if (!flow.version) throw new Error('Flow version is required');
    const flowToUpdate = await this.findOne({ flowId, version: flow.version });

    if (!flowToUpdate)
      throw new NotFoundException(`Flow with id ${flowId} not found`);

    const updatedFlow = {
      ...flowToUpdate,
      ...flow,
      version: flowToUpdate.version + 1,
    };

    return this.save(updatedFlow);
  }

  async findFlowToRun(flowId: number) {
    const flow = await this.repository.findOne({
      relations: { steps: true },
      where: {
        flowId,
      },
      order: { version: 'DESC' },
    });

    if (!flow) throw new NotFoundException(`Flow with id ${flowId} not found`);

    return FlowMapper.toDomain(flow);
  }
}
