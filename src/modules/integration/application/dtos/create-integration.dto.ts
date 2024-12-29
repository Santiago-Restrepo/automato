import { IsEnum, IsNotEmpty } from 'class-validator';
import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

export class CreateIntegrationDto {
  @IsNotEmpty()
  @IsEnum(ClientKeys)
  name: ClientKeys;
}
