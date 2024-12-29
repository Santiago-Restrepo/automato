import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { FlowModule } from './modules/flow/flow.module';
import { StepParameterModule } from './modules/step-parameter/step-parameter.module';
import { FlowExecutionModule } from './modules/flow-execution/flow-execution.module';
import { StepExecutionModule } from './modules/step-execution/step-execution.module';
import { TriggerModule } from './modules/trigger/trigger.module';
import { TriggerExecutionModule } from './modules/trigger-execution/trigger-execution.module';
import { ExecutionModule } from './modules/execution/execution.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { ClientModule } from './modules/client/client.module';
import typeormModule from './config/typeorm.module';
import configModule from './config/config.module';
import { FunctionModule } from './modules/function/function.module';
import { FunctionParameterModule } from './modules/function-parameter/function-parameter.module';
import { FlowIntegrationModule } from './modules/flow-integration/flow-integration.module';

@Module({
  imports: [
    configModule,
    typeormModule,
    StepModule,
    FlowModule,
    StepParameterModule,
    FlowExecutionModule,
    StepExecutionModule,
    FunctionModule,
    TriggerModule,
    TriggerExecutionModule,
    ExecutionModule,
    IntegrationModule,
    ClientModule,
    FunctionParameterModule,
    FlowIntegrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
