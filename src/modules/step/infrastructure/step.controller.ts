import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStepService } from '../application/services/create-step.service';
import { UpdateStepService } from '../application/services/update-step.service';
import { DeleteStepService } from '../application/services/delete-step.service';
import { CreateStepDto } from '../application/dtos/create-step.dto';
import { GetStepParameterService } from 'src/modules/step-parameter/application/get-step-parameter.service';

@Controller('step')
export class StepController {
  constructor(
    private readonly createStepService: CreateStepService,
    private readonly updateStepService: UpdateStepService,
    private readonly deleteStepService: DeleteStepService,
    private readonly getStepParameterService: GetStepParameterService,
  ) {}

  @Post()
  async create(@Body() createStepDto: CreateStepDto) {
    return this.createStepService.create(createStepDto);
  }

  @Get(':id/parameters')
  async getParameters(@Param('id') id: string) {
    return this.getStepParameterService.getByStep(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteStepService.delete(id);
  }
}
