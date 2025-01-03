import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FunctionBlockOrmEntity from '../entities/function-block.orm-entity';
import { FunctionRepository } from '../../domain/repositories/function.repository';
import { FunctionBlock } from '../../domain/entities/function-block.entity';

@Injectable()
export class FunctionRepositoryImpl implements FunctionRepository {
  private repository: Repository<FunctionBlockOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(FunctionBlockOrmEntity);
  }

  findAll(): Promise<FunctionBlock[]> {
    return this.repository.find();
  }
}
