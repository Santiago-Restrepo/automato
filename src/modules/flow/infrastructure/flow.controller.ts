import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { RunFlowService } from '../application/services/run-flow.service';
import { GetFlowService } from '../application/services/get-flow.service';
import { CreateFlowService } from '../application/services/create-flow.service';
import { CreateFlowDto } from '../application/dtos/create-flow.dto';
import { UpdateFlowDto } from '../application/dtos/update-flow.dto';
import { UpdateFlowService } from '../application/services/update-flow.service';
import { GetStepService } from 'src/modules/step/application/services/get-step.service';
import { UpdateStepService } from 'src/modules/step/application/services/update-step.service';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { GetFlowIntegrationService } from 'src/modules/flow-integration/application/services/get-flow-integrations.service';

@Controller('flow')
export class FlowController {
  constructor(
    private readonly runFlowService: RunFlowService,
    private readonly getFlowService: GetFlowService,
    private readonly createFlowService: CreateFlowService,
    private readonly updateFlowService: UpdateFlowService,
    private readonly updateStepService: UpdateStepService,
    private readonly getStepService: GetStepService,
    private readonly getFlowIntegrationService: GetFlowIntegrationService,
  ) {}

  @Get()
  async getAllFlows() {
    return this.getFlowService.getAllFlows();
  }

  @Get(':id')
  async getFlow(@Param('id') id: string) {
    return this.getFlowService.getFlow(id);
  }

  @Get(':flowId/steps')
  async getFlowSteps(@Param('flowId') flowId: string) {
    return this.getStepService.getByFlowId(flowId);
  }

  @Get(':flowId/integrations')
  async getFlowIntegrations(@Param('flowId') flowId: string) {
    return this.getFlowIntegrationService.getFlowIntegrations(flowId);
  }

  @Post('run/:id')
  async run(@Param('id') id: string) {
    return this.runFlowService.run(id);
  }

  @Post()
  async createFlow(@Body() createFlowDto: CreateFlowDto) {
    return this.createFlowService.create(createFlowDto);
  }

  @Patch(':id')
  async updateFlow(
    @Param('id') id: string,
    @Body() updateFlowDto: UpdateFlowDto,
  ) {
    return this.updateFlowService.update(id, updateFlowDto);
  }

  @Put(':id/steps')
  async updateFlowSteps(@Param('id') id: string, @Body() steps: Step[]) {
    return this.updateStepService.updateFlowSteps(id, steps);
  }
}
