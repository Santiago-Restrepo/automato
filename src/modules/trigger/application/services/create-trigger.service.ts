import { Inject, Injectable } from '@nestjs/common';
import { TriggerRepository } from '../../domain/ports/trigger.repository';
import { Trigger } from '../../domain/entities/trigger.entity';
import { CreateTriggerDto } from '../dtos/create-trigger.dto';

@Injectable()
export class CreateTriggerService {
  constructor(
    @Inject('TriggerRepository')
    private readonly triggerRepository: TriggerRepository,
  ) {}

  async create(createTriggerDto: CreateTriggerDto): Promise<Trigger> {
    return this.triggerRepository.create(createTriggerDto);
  }
}
