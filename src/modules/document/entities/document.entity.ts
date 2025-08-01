import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { DocumentType } from '../../document-type/entities/document-type.entity';

@Entity('document')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => DocumentType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_type_id' })
  documentType: DocumentType;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'SUBMITTED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
