import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { validateDto } from 'src/utils/validate-dto';
import { ValidateEnvDto } from './application/dtos/validate-env.dto';

export default ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  validate: (config: Record<string, unknown>) =>
    validateDto(ValidateEnvDto, config),
  load: [configuration],
});
