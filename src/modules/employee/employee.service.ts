import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  list(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  create(data: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(data);

    return this.employeeRepository.save(employee);
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    Object.assign(employee, data);

    return this.employeeRepository.save(employee);
  }
}
