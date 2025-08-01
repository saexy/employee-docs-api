import { Body, Controller, Post, Param, Get, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os colaboradores.' })
  @ApiResponse({
    status: 201,
    description: 'Lista de colaboradores.',
    type: Employee,
  })
  list(): Promise<Employee[]> {
    return this.employeeService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um colaborador.' })
  @ApiResponse({
    status: 201,
    description: 'Colaborador criado.',
    type: Employee,
  })
  create(@Body() data: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um colaborador.' })
  @ApiResponse({
    status: 200,
    description: 'Colaborador atualizado.',
    type: Employee,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, data);
  }
}
