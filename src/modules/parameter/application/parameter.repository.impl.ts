import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ParameterRepository } from '../domain/parameter.repository';
import { Parameter } from '../domain/parameter.entity';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';
import StepExecution from 'src/modules/step-execution/domain/step-execution.entity';
import Step from 'src/modules/step/domain/step.entity';

@Injectable()
export class ParameterRepositoryImpl
  extends Repository<Parameter>
  implements ParameterRepository
{
  constructor(private datasource: DataSource) {
    super(Parameter, datasource.createEntityManager());
  }

  async getStepParameters(
    step: Step,
    flowExecution: FlowExecution,
  ): Promise<Parameter[]> {
    const parameters = await this.find({
      relations: {
        stepOutput: true,
      },
      where: {
        stepId: step.id,
      },
    });
    return Promise.all(
      parameters.map(async (parameter) => {
        const stepExecution = await this.datasource
          .getRepository(StepExecution)
          .findOne({
            where: {
              flowExecutionId: flowExecution.id,
              stepId: parameter.stepOutput?.stepId,
            },
          });
        return {
          ...parameter,
          value: parameter.value ?? stepExecution?.output,
        };
      }),
    );
  }
}
