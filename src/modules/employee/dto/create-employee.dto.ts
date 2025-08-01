import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Colaborador da Silva' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'colaborador@example.com' })
  @IsEmail()
  email: string;
}
