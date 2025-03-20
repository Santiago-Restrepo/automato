import { Module } from '@nestjs/common';
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
import { FunctionModule } from './modules/function/function.module';
import { FunctionParameterModule } from './modules/function-parameter/function-parameter.module';
import { FlowIntegrationModule } from './modules/flow-integration/flow-integration.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import LoggingInterceptor from './common/logging.interceptor';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { WorkerModule } from './modules/worker/worker.module';
import { QueueModule } from './modules/queue/queue.module';
import configurationModule from './modules/configuration/configuration.module';

@Module({
  imports: [
    AuthModule,
    HealthCheckModule,
    UserModule,
    configurationModule,
    PersistenceModule,
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
    EncryptionModule,
    WebhookModule,
    WorkerModule,
    QueueModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
