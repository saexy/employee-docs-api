import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { EmployeeModule } from '../employee/employee.module';
import { DocumentTypeModule } from '../document-type/document-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    EmployeeModule,
    DocumentTypeModule,
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
