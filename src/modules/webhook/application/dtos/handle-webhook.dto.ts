import { ApiProperty } from '@nestjs/swagger';

export class handleWebhookDto {
  @ApiProperty()
  flowId: string;

  @ApiProperty()
  payload: any;
}
