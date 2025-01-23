import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import StepOrmEntity from '../entities/step.orm-entity';
import { StepRepository } from '../../domain/ports/step.repository';
import { Step } from '../../domain/entities/step.entity';
import { StepMapper } from '../mappers/step.mapper';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import { StepParameterOrmEntity } from 'src/modules/step-parameter/infrastructure/entities/step-parameter.orm-entity';

@Injectable()
export class StepRepositoryImpl implements StepRepository {
  private repository: Repository<StepOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(StepOrmEntity);
  }

  async findById(id: string): Promise<Step | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? StepMapper.toDomain(ormEntity) : null;
  }

  async findByFlowId(flowId: string): Promise<Step[]> {
    const ormEntities = await this.repository.find({
      relations: { parameters: { functionParameter: true }, function: true },
      where: { flowId },
      order: { order: 'ASC' },
    });
    return ormEntities.map((ormEntity) => StepMapper.toDomain(ormEntity));
  }

  create(step: Pick<Step, 'flowId' | 'order'> & Partial<Step>): Promise<Step> {
    const stepToSave = Step.create(step);
    return this.save(stepToSave);
  }

  async save(step: Step): Promise<Step> {
    const ormEntity = StepMapper.toOrm(step);
    const savedEntity = await this.repository.save(ormEntity);
    return StepMapper.toDomain(savedEntity);
  }

  async update(id: string, step: Partial<Step>): Promise<Step> {
    const stepToUpdate = await this.findById(id);
    if (!stepToUpdate) {
      throw new Error(`Step with id ${id} not found`);
    }
    const updatedStep = { ...stepToUpdate, ...step };
    const ormEntity = StepMapper.toOrm(updatedStep);
    const savedEntity = await this.repository.save(ormEntity);
    return StepMapper.toDomain(savedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async updateFlowSteps(flowId: string, steps: Step[]): Promise<Step[]> {
    const ormFlow = await this.datasource.getRepository(FlowOrmEntity).findOne({
      where: { id: flowId },
      relations: { steps: { parameters: true } },
    });

    if (!ormFlow) {
      throw new Error(`Flow with id ${flowId} not found`);
    }

    const currentStepParameters = ormFlow.steps?.flatMap(
      (step) => step.parameters,
    );

    const newStepParameters = steps.flatMap((step) => step.parameters);

    const noMoreUsedSteps = ormFlow.steps?.filter(
      (step) => !steps.find((s) => s.id === step.id),
    );

    const noMoreUsedStepParameters = currentStepParameters?.filter(
      (stepParameter) =>
        !newStepParameters.find((s) => s?.id === stepParameter.id),
    );

    if (noMoreUsedStepParameters) {
      await this.datasource.getRepository(StepParameterOrmEntity).softDelete({
        id: In(
          noMoreUsedStepParameters.map((stepParameter) => stepParameter.id),
        ),
      });
    }

    if (noMoreUsedSteps) {
      await this.datasource
        .getRepository(StepOrmEntity)
        .softDelete({ id: In(noMoreUsedSteps.map((step) => step.id)) });
    }

    const savedSteps = await Promise.all(
      steps.map(async (step) => {
        return this.save(step);
      }),
    );
    return savedSteps;
  }
}
