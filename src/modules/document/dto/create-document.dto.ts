import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  employeeId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  documentTypeId: string;
}
