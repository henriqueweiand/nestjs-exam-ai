import { Logger, LoggerService } from '@app/logger';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { UseGuards } from '@nestjs/common';
import { ClerkAuthGuard, CurrentUser } from '@libs/auth';
import { User } from '@clerk/backend';

import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { Record } from './record/record.entity';
import { RecordGroup } from './record/record-group.model';

@Resolver(() => Exam)
@UseGuards(ClerkAuthGuard)
export class ExamResolver {
  private readonly logger: Logger;

  constructor(
    private readonly examService: ExamService,
    private readonly loggerService: LoggerService,
  ) {
    this.logger = this.loggerService.getLogger(ExamResolver.name);
  }

  @Query(() => [Exam])
  async getAll(@CurrentUser() user: User): Promise<Exam[]> {
    this.logger.log(`Fetching all exams for user: ${user.id}`);
    return await this.examService.findAll(user.id);
  }

  @Query(() => Exam)
  async getById(@Args('id') id: string, @CurrentUser() user: User): Promise<Exam> {
    this.logger.log(`Fetching exam ${id} for user: ${user.id}`);
    return await this.examService.findOne(id, user.id);
  }

  @Mutation(() => Exam)
  async uploadExam(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: Promise<FileUpload>,
    @CurrentUser() user: User,
  ): Promise<Exam> {
    this.logger.log(`Starting exam upload for user: ${user.id}`);

    const upload = await file;
    const exam = await this.examService.uploadAndCreate(upload, user.id);

    this.logger.log(`Exam processed successfully with ID: ${exam.id}`);

    return exam;
  }

  @Query(() => [Record])
  async getRecords(@CurrentUser() user: User, @Args('recordName', { nullable: true }) recordName?: string): Promise<Record[]> {
    this.logger.log(`Fetching records for user: ${user.id} with filter: ${recordName || 'none'}`);
    return await this.examService.findAllRecordsByName(user.id, recordName);
  }

  @Query(() => [RecordGroup])
  async getAllRecordsPerGroup(@CurrentUser() user: User): Promise<RecordGroup[]> {
    this.logger.log(`Fetching grouped records for user: ${user.id}`);
    return await this.examService.findAllRecordsPerGroup(user.id);
  }
}
