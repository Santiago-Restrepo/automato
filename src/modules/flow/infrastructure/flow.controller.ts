import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RunFlowService } from '../application/services/run-flow.service';

@Controller('flow')
export class FlowController {
  constructor(private readonly runFlowService: RunFlowService) {}

  @Post('run/:id')
  async run(@Param('id', ParseIntPipe) id: number) {
    return this.runFlowService.run(id);
  }
}
