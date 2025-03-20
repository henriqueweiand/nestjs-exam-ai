import { Module } from '@nestjs/common';
import { OpenAIService } from './opeanai.service';
import { OpenAIController } from './openai.controller';

@Module({
  imports: [],
  controllers: [OpenAIController],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
