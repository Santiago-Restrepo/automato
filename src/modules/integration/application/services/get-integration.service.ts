import { Inject, Injectable } from '@nestjs/common';
import { IntegrationRepository } from '../../domain/ports/integration.repository';
import { Integration } from '../../domain/entities/integration.entity';

@Injectable()
export class GetIntegrationService {
  constructor(
    @Inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository,
  ) {}

  getAll(): Promise<Integration[]> {
    return this.integrationRepository.findAll();
  }

  getOne(id: number): Promise<Integration | null> {
    return this.integrationRepository.findOne({ id });
  }
}
