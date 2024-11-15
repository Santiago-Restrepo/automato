import { Module } from '@nestjs/common';
import { RunBlockService } from './application/run-block.service';
import { ParameterModule } from '../parameter/parameter.module';

@Module({
  imports: [ParameterModule],
  providers: [RunBlockService],
  exports: [RunBlockService],
})
export class BlockExecutionModule {}
