import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { FlowModule } from './modules/flow/flow.module';
import { BlockModule } from './modules/block/block.module';
import { FunctionParameterModule } from './modules/function-parameter/function-parameter.module';
import { FunctionBlockModule } from './modules/function-block/function-block.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import { FlowExecutionModule } from './modules/flow-execution/flow-execution.module';
import { StepExecutionModule } from './modules/step-execution/step-execution.module';
import { BlockExecutionModule } from './modules/block-execution/block-execution.module';
import typeormModule from './config/typeorm.module';
import configModule from './config/config.module';

@Module({
  imports: [
    configModule,
    typeormModule,
    StepModule,
    FlowModule,
    BlockModule,
    FunctionParameterModule,
    FunctionBlockModule,
    ParameterModule,
    FlowExecutionModule,
    StepExecutionModule,
    BlockExecutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
