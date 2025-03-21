import { Module } from '@nestjs/common';

import { LoggerModule } from '@app/logger';
import { EnvModule } from '@libs/env';
import { PersistenceModule } from '@libs/persistence';
import { GraphqlModule } from '@libs/graphql';
import { ExamModule } from '@components/exam';
import { AuthModule } from '@libs/auth';

const app = 'APP';

@Module({
  imports: [AuthModule, LoggerModule, EnvModule.register(app), PersistenceModule.registerTypeOrm(app), ExamModule, GraphqlModule],
})
export class AppModule {}
