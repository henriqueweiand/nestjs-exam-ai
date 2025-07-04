import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload-ts';
import { ILike, Repository } from 'typeorm';

import { Logger, LoggerService } from '@app/logger';
import { FileManagementService } from '@components/file-management/file-management.service';
import { Exam } from './exam.entity';
import { Record } from './record/record.entity';
import { RecordService } from './record/record.service';
import { OpenAIService } from '@components/openai/opeanai.service';
import { RecordGroup } from './record/record-group.model';

@Injectable()
export class ExamService {
  private logger: Logger;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly recordService: RecordService,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    private readonly fileManagementService: FileManagementService,
    private readonly openAIService: OpenAIService,
  ) {
    this.logger = this.loggerService.getLogger(ExamService.name);
  }

  async findAll(userId: string): Promise<Exam[]> {
    return await this.examRepository.find({
      where: { userId },
      relations: ['records'],
      order: { collectedDate: 'DESC' as const },
    });
  }

  async findOne(id: string, userId: string): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { id, userId },
      relations: ['records'],
    });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    return exam;
  }

  async findByChecksum(checksum: string, userId: string): Promise<Exam | null> {
    return await this.examRepository.findOne({
      where: { file_checksum: checksum, userId },
      relations: ['records'],
    });
  }

  async create(data: Partial<Exam>): Promise<Exam> {
    const exam = this.examRepository.create({
      userId: data.userId,
      file_url: data.file_url,
      file_checksum: data.file_checksum,
      summary: data.summary || '',
      recommendations: data.recommendations || '',
      records: data.records?.map(finding => new Record({ ...finding })) || [],
    });

    await this.examRepository.save(exam);
    return exam;
  }

  async uploadAndCreate(file: FileUpload, userId: string): Promise<Exam> {
    try {
      // Save file
      const { path, checksum } = await this.fileManagementService.saveFile(file);

      // Check if exam already exists
      const existingExam = await this.findByChecksum(checksum, userId);
      if (existingExam) {
        // Remove the uploaded file since it's a duplicate
        await this.fileManagementService.deleteFile(path);
        throw new ConflictException('An exam with this content already exists');
      }

      // Create initial exam record
      const exam = await this.create({
        userId,
        file_url: path,
        file_checksum: checksum,
      });

      try {
        // Process with OpenAI
        const fileStream = this.fileManagementService.getFileStream(path);
        const processedData = await this.openAIService.processExamFile(fileStream);

        if (!processedData || !processedData[0]?.content?.[0]?.text?.value) {
          throw new Error('Invalid response format from OpenAI');
        }

        // Update exam with processed data
        const parsedData = JSON.parse(processedData[0].content[0].text.value);

        exam.summary = parsedData.summary;
        exam.recommendations = parsedData.recommendations;
        exam.collectedDate = parsedData.examDate || new Date();

        // Create records
        exam.records = await Promise.all(
          parsedData.findings.map(finding =>
            this.recordService.create({
              examId: exam.id,
              ...finding,
            }),
          ),
        );

        return await this.examRepository.save(exam);
      } catch (error) {
        this.logger.error(`Failed to process exam with OpenAI: ${error.message}`);
        throw new InternalServerErrorException('Failed to process exam with AI');
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Failed to handle exam upload: ${error.message}`);
      throw new InternalServerErrorException('Failed to handle exam upload');
    }
  }

  async findAllRecordsByName(userId: string, recordName: string): Promise<Record[]> {
    const query = {
      relations: ['exam'],
      where: {
        exam: {
          userId: userId,
        },
        name: ILike(`%${recordName}%`),
      },
      order: {
        exam: {
          collectedDate: 'DESC' as const,
        },
      },
    };

    return await this.recordRepository.find(query);
  }

  async findAllRecordsPerGroup(userId: string): Promise<RecordGroup[]> {
    const records = await this.recordRepository.find({
      relations: ['exam'],
      where: {
        exam: {
          userId: userId,
        },
      },
      order: {
        exam: {
          collectedDate: 'DESC',
        },
      },
    });

    const groupedMap = records.reduce((acc, record) => {
      if (!acc.has(record.name)) {
        acc.set(record.name, []);
      }
      acc.get(record.name).push(record);
      return acc;
    }, new Map<string, Record[]>());

    return Array.from(groupedMap.entries()).map(([name, records]) => ({
      name,
      records,
    }));
  }
}
