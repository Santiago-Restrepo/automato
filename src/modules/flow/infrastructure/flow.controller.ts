import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RunFlowService } from '../application/services/run-flow.service';
import { GetFlowService } from '../application/services/get-flow.service';
import { CreateFlowService } from '../application/services/create-flow.service';
import { CreateFlowDto } from '../application/dtos/create-flow.dto';
import { UpdateFlowDto } from '../application/dtos/update-flow.dto';
import { UpdateFlowService } from '../application/services/update-flow.service';

@Controller('flow')
export class FlowController {
  constructor(
    private readonly runFlowService: RunFlowService,
    private readonly getFlowService: GetFlowService,
    private readonly createFlowService: CreateFlowService,
    private readonly updateFlowService: UpdateFlowService,
  ) {}

  @Post('run/:id')
  async run(@Param('id', ParseIntPipe) id: number) {
    return this.runFlowService.run(id);
  }

  @Get('all')
  async getAllFlows() {
    return this.getFlowService.getAllFlows();
  }

  @Get(':id')
  async getFlow(@Param('id', ParseIntPipe) id: number) {
    return this.getFlowService.getFlow(id);
  }

  @Post()
  async createFlow(@Body() createFlowDto: CreateFlowDto) {
    return this.createFlowService.create(createFlowDto);
  }

  @Patch(':id')
  async updateFlow(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlowDto: UpdateFlowDto,
  ) {
    return this.updateFlowService.update(id, updateFlowDto);
  }
}
