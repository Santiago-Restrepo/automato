import { Module } from '@nestjs/common';
import { EncryptionService } from './application/encryption.service';

@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
