import { DataSource, Repository } from 'typeorm';
import FlowOrmEntity from '../entities/flow.orm-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../../domain/ports/flow.repository';
import { Flow } from '../../domain/entities/flow.entity';
import { FlowMapper } from '../mappers/flow.mapper';

@Injectable()
export class FlowRepositoryImpl implements FlowRepository {
  private repository: Repository<FlowOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(FlowOrmEntity);
  }

  async findAll(): Promise<Flow[]> {
    const ormEntities = await this.repository.find({
      order: { createdAt: 'ASC' },
    });
    return ormEntities.map((ormEntity) => FlowMapper.toDomain(ormEntity));
  }

  async findOne(query: Partial<Flow>): Promise<Flow | null> {
    const ormEntity = await this.repository.findOne({
      where: query as any,
      relations: { steps: true },
    });
    return ormEntity ? FlowMapper.toDomain(ormEntity) : null;
  }

  create(flow: Partial<Flow>): Promise<Flow> {
    const flowToSave = Flow.create(flow);
    return this.save(flowToSave);
  }

  async save(flow: Flow): Promise<Flow> {
    const ormEntity = FlowMapper.toOrm(flow);
    const savedEntity = await this.repository.save(ormEntity);
    return FlowMapper.toDomain(savedEntity);
  }

  async update(id: string, flow: Partial<Flow>): Promise<Flow> {
    const flowToUpdate = await this.findOne({
      id,
    });

    if (!flowToUpdate)
      throw new NotFoundException(`Flow with id ${id} not found`);

    const updatedFlow = {
      ...flowToUpdate,
      ...flow,
    };
    return this.save(updatedFlow);
  }

  async findFlowToRun(id: string) {
    const flow = await this.repository.findOne({
      relations: { steps: true },
      where: {
        id,
      },
      order: {
        steps: {
          order: 'ASC',
        },
      },
    });

    if (!flow) throw new NotFoundException(`Flow with id ${id} not found`);

    return FlowMapper.toDomain(flow);
  }
}
