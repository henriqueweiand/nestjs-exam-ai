import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { join } from 'path';

import { Logger, LoggerService } from '@app/logger';
import { Exam } from './exam.entity';
import { RecordService } from './record/record.service';

@Injectable()
export class ExamService {
  private logger: Logger;
  private readonly uploadsPath: string;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly recordService: RecordService,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {
    this.logger = this.loggerService.getLogger(ExamService.name);
    this.uploadsPath = join(process.cwd(), 'uploads');
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

  async uploadAndCreate(file: FileUpload): Promise<Exam> {
    const { createReadStream } = file;
    const uniqueFilename = `${uuidv4()}`;
    const filePath = join(this.uploadsPath, uniqueFilename);

    // Create read stream and calculate checksum
    const readStream = createReadStream();
    const hash = crypto.createHash('md5');

    // Save file and calculate checksum
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      readStream.pipe(hash).pipe(writeStream).on('finish', resolve).on('error', reject);
    });

    const checksum = hash.digest('hex');

    // Create exam record
    return this.create({
      file_url: filePath,
      file_checksum: checksum,
    });
  }
}
