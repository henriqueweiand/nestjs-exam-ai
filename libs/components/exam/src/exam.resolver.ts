import { Logger, LoggerService } from '@app/logger';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

import { Exam } from './exam.entity';
import { ExamService } from './exam.service';

@Resolver(() => Exam)
export class ExamResolver {
  private readonly logger: Logger;

  constructor(
    private readonly examService: ExamService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(ExamResolver.name);
  }

  @Query(() => [Exam])
  async getAll(): Promise<Exam[]> {
    return await this.examService.findAll();
  }

  @Query(() => Exam)
  async getOne(@Args('id') id: string): Promise<Exam> {
    return await this.examService.findOne(id);
  }

  @Mutation(() => Exam)
  async uploadExam(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: Promise<FileUpload>,
  ): Promise<Exam> {
    this.logger.log('Starting exam upload and processing');

    const upload = await file;
    const exam = await this.examService.uploadAndCreate(upload);

    this.logger.log(`Exam processed successfully with ID: ${exam.id}`);

    return exam;
  }
}
