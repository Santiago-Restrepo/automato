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

  async findOne(query: Partial<Flow>): Promise<Flow | null> {
    const ormEntity = await this.repository.findOne({ where: query as any });
    return ormEntity ? FlowMapper.toDomain(ormEntity) : null;
  }

  async save(flow: Flow): Promise<Flow> {
    const ormEntity = FlowMapper.toOrm(flow);
    const savedEntity = await this.repository.save(ormEntity);
    return FlowMapper.toDomain(savedEntity);
  }

  async findFlowToRun(id: number) {
    const flow = await this.repository.findOne({
      relations: { steps: true },
      where: {
        id,
      },
    });

    if (!flow) throw new NotFoundException(`Flow with id ${id} not found`);

    return FlowMapper.toDomain(flow);
  }
}
