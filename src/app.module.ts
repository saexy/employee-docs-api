import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
