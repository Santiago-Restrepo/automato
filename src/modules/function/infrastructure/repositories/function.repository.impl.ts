import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FunctionBlockOrmEntity from '../entities/function-block.orm-entity';
import { FunctionRepository } from '../../domain/repositories/function.repository';
import { FunctionBlock } from '../../domain/entities/function-block.entity';
import { FunctionBlockMapper } from '../mappers/function-block.mapper';

@Injectable()
export class FunctionRepositoryImpl implements FunctionRepository {
  private repository: Repository<FunctionBlockOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(FunctionBlockOrmEntity);
  }

  async findAll(): Promise<FunctionBlock[]> {
    const ormEntities = await this.repository.find({
      relations: { parameters: true },
    });
    return ormEntities.map((ormEntity) =>
      FunctionBlockMapper.toDomain(ormEntity),
    );
  }
}
