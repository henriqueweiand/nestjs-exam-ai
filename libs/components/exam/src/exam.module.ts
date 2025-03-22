import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';
import { OpenAIModule } from '@components/openai';
import { FileManagementModule } from '@components/file-management';

import { RecordModule } from './record/record.module';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { ExamResolver } from './exam.resolver';
import { Record } from './record/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Record]), LoggerModule, RecordModule, FileManagementModule, OpenAIModule],
  providers: [ExamService, ExamResolver],
  exports: [ExamService],
})
export class ExamModule {}
