import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStepService } from '../application/services/create-step.service';
import { DeleteStepService } from '../application/services/delete-step.service';
import { CreateStepDto } from '../application/dtos/create-step.dto';
import { GetStepParameterService } from 'src/modules/step-parameter/application/get-step-parameter.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('TOKEN')
@ApiTags('Steps')
@Controller('step')
export class StepController {
  constructor(
    private readonly createStepService: CreateStepService,
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
