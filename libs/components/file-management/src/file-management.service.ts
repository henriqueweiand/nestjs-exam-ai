import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import { FileUpload } from 'graphql-upload-ts';
import { Logger, LoggerService } from '@app/logger';

@Injectable()
export class FileManagementService {
  private logger: Logger;

  constructor(private readonly loggerService: LoggerService) {
    this.logger = this.loggerService.getLogger(FileManagementService.name);
  }

  async saveFile(file: FileUpload): Promise<{ path: string; checksum: string }> {
    const UPLOAD_DIR = 'uploads';
    const uploadsPath = join(process.cwd(), UPLOAD_DIR);

    // Ensure upload directory exists
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
    }

    const { createReadStream, filename } = file;
    const fileExtension = extname(filename);
    const randomFilename = `${uuidv4()}${fileExtension}`;
    const filePath = join(uploadsPath, randomFilename);

    // First, save the file
    await new Promise((resolve, reject) => {
      const fileStream = createReadStream();
      const writeStream = createWriteStream(filePath);

      fileStream.pipe(writeStream).on('finish', resolve).on('error', reject);
    });

    // Then calculate checksum from saved file
    const fileBuffer = await fs.promises.readFile(filePath);
    const hash = crypto.createHash('md5');
    hash.update(fileBuffer);

    return {
      path: filePath,
      checksum: hash.digest('hex'),
    };
  }

  getFileStream(filePath: string): fs.ReadStream {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    return fs.createReadStream(filePath, {
      encoding: null,
      autoClose: true,
    });
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fsPromises.unlink(filePath);
      this.logger.log(`Successfully deleted file: ${filePath}`);
    } catch (error) {
      this.logger.error(`Failed to delete file ${filePath}: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }
}
