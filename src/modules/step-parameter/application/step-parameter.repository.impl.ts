import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StepParameterRepository } from '../domain/step-parameter.repository';
import { StepParameter } from '../domain/step-parameter.entity';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

@Injectable()
export class StepParameterRepositoryImpl
  extends Repository<StepParameter>
  implements StepParameterRepository
{
  constructor(private datasource: DataSource) {
    super(StepParameter, datasource.createEntityManager());
  }

  async getStepParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<StepParameter[]> {
    const parameters = await this.find({
      relations: {
        functionParameter: true,
        outputStep: true,
      },
      where: {
        inputStepId: step.id,
      },
    });
    return Promise.all(
      parameters.map(async (parameter) => {
        const stepExecution = await this.datasource
          .getRepository(Execution<Step>)
          .findOne({
            where: {
              parentExecutionId: flowExecution.id,
              referenceStepId: parameter.outputStep?.id,
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
