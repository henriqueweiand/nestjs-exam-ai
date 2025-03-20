import { Controller, Get } from '@nestjs/common';
import { OpenAIService } from './opeanai.service';

@Controller()
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Get()
  async run() {
    // const fileId = await this.openAIService.uploadExamPdf();
    // const thread = await this.openAIService.createThread();
    // await this.openAIService.addMessage(thread.id, fileId);
    // const run = await this.openAIService.runAssistant(thread.id);
    // let result = null;
    // while (!result) {
    //   result = await this.openAIService.checkStatus(thread.id, run.id);
    //   if (!result) {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //   }
    // }
    // return result;
  }
}
