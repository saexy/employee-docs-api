import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeModule } from './modules/document-type/document-type.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DocumentModule } from './modules/document/document.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DocumentTypeModule,
    EmployeeModule,
    DocumentModule,
  ],
})
export class AppModule {}
