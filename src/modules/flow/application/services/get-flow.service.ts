import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../../domain/ports/flow.repository';

@Injectable()
export class GetFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
  ) {}

  getAllFlows() {
    return this.flowRepository.findAll();
  }

  async getFlow(id: number) {
    const flow = await this.flowRepository.findOne({ id });

    if (!flow) {
      throw new NotFoundException(`Flow with id ${id} not found`);
    }

    return flow;
  }
}
