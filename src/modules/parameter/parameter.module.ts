import { Module } from '@nestjs/common';
import { ParameterService } from './application/parameter.service';
import { ParameterRepositoryImpl } from './application/parameter.repository.impl';

@Module({
  providers: [
    ParameterService,
    {
      provide: 'ParameterRepository',
      useClass: ParameterRepositoryImpl,
    },
  ],
  exports: [ParameterService],
})
export class ParameterModule {}
