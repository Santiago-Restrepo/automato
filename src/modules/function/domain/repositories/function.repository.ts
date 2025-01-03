import { FunctionBlock } from '../entities/function-block.entity';

export interface FunctionRepository {
  findAll(): Promise<FunctionBlock[]>;
}
