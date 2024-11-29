import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { FlowModule } from './modules/flow/flow.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import { FlowExecutionModule } from './modules/flow-execution/flow-execution.module';
import { StepExecutionModule } from './modules/step-execution/step-execution.module';
import { FunctionExecutionModule } from './modules/function-execution/function-execution.module';
import { TriggerModule } from './modules/trigger/trigger.module';
import { TriggerExecutionModule } from './modules/trigger-execution/trigger-execution.module';
import typeormModule from './config/typeorm.module';
import configModule from './config/config.module';

@Module({
  imports: [
    configModule,
    typeormModule,
    StepModule,
    FlowModule,
    ParameterModule,
    FlowExecutionModule,
    StepExecutionModule,
    FunctionExecutionModule,
    TriggerModule,
    TriggerExecutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
