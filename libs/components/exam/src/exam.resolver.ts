import { Logger, LoggerService } from '@app/logger';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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
  async create(@Args('file_url') file_url: string, @Args('file_checksum') file_checksum: string): Promise<Exam> {
    return await this.examService.create({
      file_url,
      file_checksum,
    });
  }
}
