import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from '../../config/data-source';

export default TypeOrmModule.forRootAsync({
  useFactory: () => ({}),
  dataSourceFactory: async () => {
    return dataSource;
  },
});
