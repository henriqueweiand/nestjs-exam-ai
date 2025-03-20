import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class FileManagementService {
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
}
