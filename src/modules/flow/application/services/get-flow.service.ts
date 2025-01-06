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

  async getFlow(flowId: number) {
    const flow = await this.flowRepository.findOne({ flowId });

    if (!flow) {
      throw new NotFoundException(`Flow with id ${flowId} not found`);
    }

    return flow;
  }
}
