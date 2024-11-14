import { Module } from '@nestjs/common';
import { BlockModule } from '../block/block.module';
import { StepRepositoryImpl } from './application/step.repository.impl';

@Module({
  imports: [BlockModule],
  providers: [
    {
      provide: 'StepRepository',
      useClass: StepRepositoryImpl,
    },
  ],
  exports: [],
})
export class StepModule {}
