import { Inject, Injectable } from '@nestjs/common';
import { FlowRepository } from '../../domain/ports/flow.repository';
import { CreateFlowDto } from '../dtos/create-flow.dto';

@Injectable()
export class CreateFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
  ) {}

  async create(createFlowDto: CreateFlowDto) {
    return this.flowRepository.create(createFlowDto);
  }
}
