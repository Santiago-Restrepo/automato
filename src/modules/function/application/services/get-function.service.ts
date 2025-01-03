import { Inject, Injectable } from '@nestjs/common';
import { FunctionRepository } from '../../domain/repositories/function.repository';
import { FunctionBlock } from '../../domain/entities/function-block.entity';

@Injectable()
export class GetFunctionService {
  constructor(
    @Inject('FunctionRepository')
    private readonly functionRepository: FunctionRepository,
  ) {}

  async findAll(): Promise<FunctionBlock[]> {
    return this.functionRepository.findAll();
  }
}
