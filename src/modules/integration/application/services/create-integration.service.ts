import { Inject, Injectable } from '@nestjs/common';
import { IntegrationRepository } from '../../domain/ports/integration.repository';
import { Integration } from '../../domain/entities/integration.entity';
import { CreateIntegrationDto } from '../dtos/create-integration.dto';

@Injectable()
export class CreateIntegrationService {
  constructor(
    @Inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository,
  ) {}

  async create(
    createIntegrationDto: CreateIntegrationDto,
  ): Promise<Integration> {
    return this.integrationRepository.create(createIntegrationDto);
  }
}
