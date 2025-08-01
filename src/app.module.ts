import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeModule } from './modules/document-type/document-type.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DocumentModule } from './modules/document/document.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    DocumentTypeModule,
    EmployeeModule,
    DocumentModule,
  ],
})
export class AppModule {}
