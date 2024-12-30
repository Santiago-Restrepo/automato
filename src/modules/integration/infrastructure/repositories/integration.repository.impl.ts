import { Injectable } from '@nestjs/common';
import { IntegrationRepository } from '../../domain/ports/integration.repository';
import { Integration } from '../../domain/entities/integration.entity';
import { IntegrationMapper } from '../mappers/integration.mapper';
import { DataSource, Repository } from 'typeorm';
import IntegrationOrmEntity from '../entities/integration.orm-entity';

@Injectable()
export class IntegrationRepositoryImpl implements IntegrationRepository {
  private repository: Repository<IntegrationOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(IntegrationOrmEntity);
  }

  create(integration: Pick<Integration, 'name'>): Promise<Integration> {
    const integrationToSave = Integration.create(integration.name);
    return this.save(integrationToSave);
  }
  async save(integration: Integration): Promise<Integration> {
    const ormEntity = IntegrationMapper.toOrm(integration);
    const savedEntity = await this.repository.save(ormEntity);
    return IntegrationMapper.toDomain(savedEntity);
  }

  async findOne(query: Partial<Integration>): Promise<Integration | null> {
    const ormEntity = await this.repository.findOneBy(query as any);
    return ormEntity ? IntegrationMapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<Integration[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map((ormEntity) =>
      IntegrationMapper.toDomain(ormEntity),
    );
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
