import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PendingDocumentsQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsOptional()
  @IsUUID()
  documentTypeId?: string;
}
