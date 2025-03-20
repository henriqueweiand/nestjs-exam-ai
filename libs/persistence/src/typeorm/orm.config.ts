import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('tsconfig-paths/register');

config({ path: join(__dirname + '../../../../../', '.env') });
config({ path: join(__dirname + '../../../../../', '.env.local'), override: true });

const configService = new ConfigService();
const DATABASE_URL = configService.get('DATABASE_URL');

let dataSourceOptions: DataSourceOptions;

if (DATABASE_URL) {
  dataSourceOptions = {
    type: 'postgres',
    url: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [__dirname + '../../../../**/*.entity{.ts,.js}'],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    logging: true,
  } as DataSourceOptions;
} else {
  dataSourceOptions = {
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
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
