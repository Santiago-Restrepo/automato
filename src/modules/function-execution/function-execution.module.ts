import { Module } from '@nestjs/common';
import { RunFunctionService } from './application/run-function.service';

@Module({
  imports: [],
  providers: [RunFunctionService],
  exports: [RunFunctionService],
})
export class FunctionExecutionModule {}
