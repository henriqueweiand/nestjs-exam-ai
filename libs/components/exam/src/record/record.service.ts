import { Logger, LoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  private logger: Logger;

  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {
    this.logger = this.loggerService.getLogger(RecordService.name);
  }

  async create(data: { examId: string; name: string; value: string; unit: string; normal_range: string; group: string }) {
    return this.recordRepository.save({
      examId: data.examId,
      name: data.name,
      value: data.value,
      unit: data.unit,
      normalRange: data.normal_range,
      group: data.group,
    });
  }
}
