import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { DocumentType } from '../modules/document-type/entities/document-type.entity';
import { Document } from '../modules/document/entities/document.entity';
import { Employee } from '../modules/employee/entities/employee.entity';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [DocumentType, Employee, Document],
  migrations: [__dirname + '/../migrations/*.ts'],
  ssl: process.env.ENV === 'dev' ? false : true,
  synchronize: false,
  migrationsRun: true,
});

export const typeOrmConfig = dataSource.options;
