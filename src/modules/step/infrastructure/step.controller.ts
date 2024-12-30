import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStepService } from '../application/services/create-step.service';
import { UpdateStepService } from '../application/services/update-step.service';
import { DeleteStepService } from '../application/services/delete-step.service';
import { CreateStepDto } from '../application/dtos/create-step.dto';
import { UpdateStepDto } from '../application/dtos/update-step.dto';

@Controller('step')
export class StepController {
  constructor(
    private readonly createStepService: CreateStepService,
    private readonly updateStepService: UpdateStepService,
    private readonly deleteStepService: DeleteStepService,
  ) {}

  @Post()
  async create(@Body() createStepDto: CreateStepDto) {
    return this.createStepService.create(createStepDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStepDto: UpdateStepDto,
  ) {
    return this.updateStepService.update(id, updateStepDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteStepService.delete(id);
  }
}
