import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class LinkDocumentTypesDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  employeeId: string;

  @ApiProperty({
    example: [
      '123e4567-e89b-12d3-a456-426614174001',
      '123e4567-e89b-12d3-a456-426614174002',
    ],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  documentTypeIds: string[];
}
