import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RunTriggerService } from '../application/services/run-trigger.service';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { CreateTriggerDto } from '../application/dtos/create-trigger.dto';
import { CreateTriggerService } from '../application/services/create-trigger.service';
import { UpdateTriggerService } from '../application/services/update-trigger.service';
import { UpdateTriggerDto } from '../application/dtos/update-trigger.dto';
import { GetTriggerService } from '../application/services/get-trigger.service';

@Controller('trigger')
export class TriggerController {
  constructor(
    private readonly triggerService: RunTriggerService,
    private readonly createTriggerService: CreateTriggerService,
    private readonly updateTriggerService: UpdateTriggerService,
    private readonly getTriggerService: GetTriggerService,
  ) {}

  @Get()
  async getAllTriggers() {
    return this.getTriggerService.getAllTriggers();
  }

  @Get(':id')
  async getTrigger(@Param('id') id: string) {
    return this.getTriggerService.getTrigger(id);
  }

  @Post()
  async create(@Body() createTriggerDto: CreateTriggerDto) {
    return this.createTriggerService.create(createTriggerDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTriggerDto: UpdateTriggerDto,
  ) {
    return this.updateTriggerService.update(id, updateTriggerDto);
  }

  @Post('run/:id')
  async run(@Param('id') id: string, @Body() payload?: ParameterValue) {
    return this.triggerService.run(id, payload);
  }
}
