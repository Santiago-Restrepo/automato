import { Inject, Injectable } from '@nestjs/common';
import { FlowRepository } from '../../domain/ports/flow.repository';
import { UpdateFlowDto } from '../dtos/update-flow.dto';

@Injectable()
export class UpdateFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
  ) {}

  async update(id: string, updateFlowDto: UpdateFlowDto) {
    return this.flowRepository.update(id, updateFlowDto);
  }
}
