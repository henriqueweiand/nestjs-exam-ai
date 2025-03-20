import { Module } from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [LoggerModule],
  providers: [FileManagementService],
  exports: [FileManagementService],
})
export class FileManagementModule {}
