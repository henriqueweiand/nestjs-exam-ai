import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';

import { RecordModule } from './record/record.module';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { ExamResolver } from './exam.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), LoggerModule, RecordModule],
  providers: [ExamService, ExamResolver],
  exports: [ExamService],
})
export class ExamModule {}
