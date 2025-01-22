import { Inject, Injectable } from '@nestjs/common';
import { TriggerRepository } from '../../domain/ports/trigger.repository';
import { Trigger } from '../../domain/entities/trigger.entity';

@Injectable()
export class GetTriggerService {
  constructor(
    @Inject('TriggerRepository')
    private readonly triggerRepository: TriggerRepository,
  ) {}

  async getTrigger(id: string): Promise<Trigger | null> {
    return this.triggerRepository.findOne({ id });
  }

  async getAllTriggers(): Promise<Trigger[]> {
    return this.triggerRepository.findAll();
  }
}
