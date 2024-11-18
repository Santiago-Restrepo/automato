import { Module } from '@nestjs/common';
import { RunFunctionService } from './application/run-function.service';
import { ParameterModule } from '../parameter/parameter.module';

@Module({
  imports: [ParameterModule],
  providers: [RunFunctionService],
  exports: [RunFunctionService],
})
export class FunctionExecutionModule {}
