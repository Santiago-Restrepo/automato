import { Inject, Injectable } from '@nestjs/common';
import { IntegrationRepository } from '../../domain/ports/integration.repository';

@Injectable()
export class DeleteIntegrationService {
  constructor(
    @Inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository,
  ) {}

  async delete(id: number) {
    return this.integrationRepository.delete(id);
  }
}
