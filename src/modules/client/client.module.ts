import { Module } from '@nestjs/common';
import { ClientService } from './application/client.service';

@Module({
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
