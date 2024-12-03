import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ParameterRepository } from '../domain/parameter.repository';
import { Parameter } from '../domain/parameter.entity';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

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
    flowExecution: Execution<Flow>,
  ): Promise<Parameter[]> {
    const parameters = await this.find({
      relations: {
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
