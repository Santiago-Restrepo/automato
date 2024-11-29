import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TriggerService } from '../application/trigger.service';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

@Controller('trigger')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Post('run/:id')
  async run(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload?: ParameterValue,
  ) {
    return this.triggerService.run(id, payload);
  }
}
