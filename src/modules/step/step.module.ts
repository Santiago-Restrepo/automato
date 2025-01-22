import { Module } from '@nestjs/common';
import { StepRepositoryImpl } from './infrastructure/repositories/step.repository.impl';
import { GetStepService } from './application/services/get-step.service';
import { CreateStepService } from './application/services/create-step.service';
import { UpdateStepService } from './application/services/update-step.service';
import { DeleteStepService } from './application/services/delete-step.service';
import { StepController } from './infrastructure/step.controller';
import { StepParameterModule } from '../step-parameter/step-parameter.module';

@Module({
  imports: [StepParameterModule],
  providers: [
    {
      provide: 'StepRepository',
      useClass: StepRepositoryImpl,
    },
    GetStepService,
    CreateStepService,
    UpdateStepService,
    DeleteStepService,
  ],
  controllers: [StepController],
  exports: [GetStepService, UpdateStepService],
})
export class StepModule {}
