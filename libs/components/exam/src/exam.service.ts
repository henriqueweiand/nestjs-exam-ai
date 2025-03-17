import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logger, LoggerService } from '@app/logger';
import { Exam } from './exam.entity';
import { RecordService } from './record/record.service';

@Injectable()
export class ExamService {
  private logger: Logger;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly recordService: RecordService,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {
    this.logger = this.loggerService.getLogger(ExamService.name);
  }

  async findAll(): Promise<Exam[]> {
    return await this.examRepository.find({
      relations: ['records'],
    });
  }

  async findOne(id: string): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: ['records'],
    });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    return exam;
  }

  async create(data: {
    file_url: string;
    file_checksum: string;
    summary?: string;
    recommendations?: string;
    findings?: Array<{
      name: string;
      value: string;
      unit: string;
      normal_range: string;
      group: string;
    }>;
  }) {
    const exam = await this.examRepository.save({
      file_url: data.file_url,
      file_checksum: data.file_checksum,
      summary: data.summary || '',
      recommendations: data.recommendations || '',
    });

    if (data.findings?.length) {
      await Promise.all(
        data.findings.map(finding =>
          this.recordService.create({
            ...finding,
            examId: exam.id,
          }),
        ),
      );
    }

    return this.findOne(exam.id);
  }
}
