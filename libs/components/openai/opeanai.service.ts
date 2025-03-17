import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class OpenAIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async uploadExamPdf(): Promise<string> {
    try {
      // const filePath = path.join(process.cwd(), 'exam.pdf');

      // const response = await this.openai.files.create({
      //   file: fs.createReadStream(filePath),
      //   purpose: 'assistants',
      // });

      return 'file-W5p9PAdTjFKmzZniCa3NmU';
      // return response.id;
    } catch (error) {
      console.error(error);
    }
  }

  async createThread() {
    return await this.openai.beta.threads.create();
  }

  async addMessage(threadId: string, fileId: string) {
    return await this.openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: 'Analyze this test report and summarize key findings.',
      attachments: [
        {
          file_id: fileId,
          tools: [
            {
              type: 'file_search',
            },
          ],
        },
      ],
    });
  }

  async runAssistant(threadId: string) {
    return await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    });
  }

  async checkStatus(threadId: string, runId: string) {
    const runObject = await this.openai.beta.threads.runs.retrieve(
      threadId,
      runId,
    );

    if (runObject.status === 'failed') throw new Error('Assistant run failed');

    if (runObject.status === 'completed') {
      const messagesList =
        await this.openai.beta.threads.messages.list(threadId);
      return messagesList.data;
    }

    return null;
  }
}
