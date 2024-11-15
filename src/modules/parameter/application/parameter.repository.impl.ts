import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Block from 'src/modules/block/domain/block.entity';
import { ParameterRepository } from '../domain/parameter.repository';
import { Parameter } from '../domain/parameter.entity';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';
import StepExecution from 'src/modules/step-execution/domain/step-execution.entity';

@Injectable()
export class ParameterRepositoryImpl
  extends Repository<Parameter>
  implements ParameterRepository
{
  constructor(private datasource: DataSource) {
    super(Parameter, datasource.createEntityManager());
  }

  async getBlockParameters(
    block: Block,
    flowExecution: FlowExecution,
  ): Promise<Parameter[]> {
    const parameters = await this.find({
      relations: {
        blockOutput: {
          block: true,
        },
        functionParameter: true,
      },
      where: {
        blockId: block.id,
      },
    });
    return Promise.all(
      parameters.map(async (parameter) => {
        const stepExecution = await this.datasource
          .getRepository(StepExecution)
          .findOne({
            where: {
              flowExecutionId: flowExecution.id,
              step: {
                blockId: parameter.blockOutput?.block?.id,
              },
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
