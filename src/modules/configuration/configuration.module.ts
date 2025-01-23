import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

export default ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  envFilePath: '.env',
  load: [configuration],
});
