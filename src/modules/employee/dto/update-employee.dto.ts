import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({ example: 'Colaborador da Silva' })
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ example: 'colaborador@example.com' })
  @IsEmail()
  email?: string;
}
