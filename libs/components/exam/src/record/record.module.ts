import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';

import { Record } from './record.entity';
import { RecordService } from './record.service';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Record])],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
