import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from './entities/document-type.entity';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeController } from './document-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentType])],
  providers: [DocumentTypeService],
  controllers: [DocumentTypeController],
  exports: [DocumentTypeService],
})
export class DocumentTypeModule {}
