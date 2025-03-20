import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async processExamFile(fileStream: ReadStream): Promise<any> {
    try {
      // Upload file to OpenAI with explicit file type
      const file = await this.openai.files.create({
        file: fileStream,
        purpose: 'assistants',
      });

      // Wait a moment for the file to be processed
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create thread and process
      const thread = await this.createThread();
      await this.addMessage(thread.id, file.id);
      const run = await this.runAssistant(thread.id);

      // Wait for processing
      let result = null;
      while (!result) {
        result = await this.checkStatus(thread.id, run.id);
        if (!result) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      return result;
    } catch (error) {
      console.error('OpenAI processing error:', error);
      throw error;
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
    const runObject = await this.openai.beta.threads.runs.retrieve(threadId, runId);

    if (runObject.status === 'failed') throw new Error('Assistant run failed');

    if (runObject.status === 'completed') {
      const messagesList = await this.openai.beta.threads.messages.list(threadId);
      return messagesList.data;
    }

    return null;
  }
}
