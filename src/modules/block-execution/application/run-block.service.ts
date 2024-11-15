import { Injectable } from '@nestjs/common';
import functions, { BlockFunctions } from './functions';
import Block from '../../block/domain/block.entity';
import Handlebars from 'handlebars';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
import { ParameterService } from 'src/modules/parameter/application/parameter.service';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';

@Injectable()
export class RunBlockService {
  functions: BlockFunctions;
  constructor(private readonly parameterService: ParameterService) {
    this.functions = functions;
  }

  async run(block: Block, flowExecution: FlowExecution) {
    const blockFunction = this.#getBlockFunction(block);
    const blockParameters = await this.parameterService.getBlockParameters(
      block,
      flowExecution,
    );
    const evaluatedParams = this.#evaluateParams(block, blockParameters);
    return blockFunction(evaluatedParams);
  }

  #getBlockFunction(block: Block) {
    const {
      functionBlock: { name: functionName },
    } = block;

    return this.functions[functionName];
  }

  #evaluateParams(block: Block, parameters: Parameter[]) {
    const {
      functionBlock: { parametersTemplate },
    } = block;
    const objectFromParameters = this.#objectFromParameters(parameters);
    const template = Handlebars.compile(JSON.stringify(parametersTemplate))(
      objectFromParameters,
    );

    return JSON.parse(template);
  }

  #objectFromParameters(parameters: Parameter[]) {
    return parameters.reduce((acc, parameter) => {
      const {
        value,
        functionParameter: { key },
      } = parameter;

      return { ...acc, [key]: value };
    }, {});
  }
}
