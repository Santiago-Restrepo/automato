import { Inject, Injectable } from '@nestjs/common';
import Block from 'src/modules/block/domain/block.entity';
import { ParameterRepository } from '../domain/parameter.repository';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';

@Injectable()
export class ParameterService {
  constructor(
    @Inject('ParameterRepository')
    private readonly parameterRepository: ParameterRepository,
  ) {}

  getBlockParameters(block: Block, flowExecution: FlowExecution) {
    return this.parameterRepository.getBlockParameters(block, flowExecution);
  }
}
