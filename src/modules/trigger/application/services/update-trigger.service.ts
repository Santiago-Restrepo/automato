import { Inject, Injectable } from '@nestjs/common';
import { TriggerRepository } from '../../domain/ports/trigger.repository';
import { UpdateTriggerDto } from '../dtos/update-trigger.dto';
import { Trigger } from '../../domain/entities/trigger.entity';

@Injectable()
export class UpdateTriggerService {
  constructor(
    @Inject('TriggerRepository')
    private readonly triggerRepository: TriggerRepository,
  ) {}

  async update(
    id: number,
    updateTriggerDto: UpdateTriggerDto,
  ): Promise<Trigger> {
    return this.triggerRepository.update(id, updateTriggerDto);
  }
}
