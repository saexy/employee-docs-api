import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({ example: 'CPF' })
  @IsString()
  @MinLength(2)
  name: string;
}
