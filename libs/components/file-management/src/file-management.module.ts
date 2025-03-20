import { Module } from '@nestjs/common';
import { FileManagementService } from './file-management.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FileManagementService],
  exports: [FileManagementService],
})
export class FileManagementModule {}
