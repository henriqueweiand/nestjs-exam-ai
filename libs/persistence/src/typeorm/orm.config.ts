import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('tsconfig-paths/register');

config({ path: join(__dirname + '../../../../../', '.env') });
config({ path: join(__dirname + '../../../../../', '.env.local'), override: true });

const configService = new ConfigService();

// Change the following line to match the name of the app
const dataSourceOptions = {
  type: 'postgres',
  host: configService.get('APP.HOST'),
  port: configService.get<number>('APP.PORT'),
  username: configService.get('APP.USERNAME'),
  password: configService.get('APP.PASSWORD'),
  database: configService.get('APP.DATABASE'),
  entities: [__dirname + '../../../../**/*.entity{.ts,.js}'],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  logging: true,
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
