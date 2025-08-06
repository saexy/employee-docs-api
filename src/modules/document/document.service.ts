import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { LinkDocumentTypesDto } from './dto/link-document-types.dto';
import { PendingDocumentsQueryDto } from './dto/pending-documents-query.dto';
import { EmployeeService } from '../employee/employee.service';
import { DocumentTypeService } from '../document-type/document-type.service';
import { Paginated } from '../../common/interfaces/paginated.interface';
import { paginate } from '../../common/utils/pagination.util';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private employeeService: EmployeeService,
    private documentTypeService: DocumentTypeService,
  ) {}

  async linkDocumentTypes(data: LinkDocumentTypesDto): Promise<void> {
    const employee = await this.employeeService.findOne(data.employeeId);

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    for (const documentTypeId of data.documentTypeIds) {
      const documentType =
        await this.documentTypeService.findOne(documentTypeId);

      if (!documentType) {
        throw new NotFoundException(
          `Tipo de documento ${documentTypeId} não encontrado.`,
        );
      }

      const existing = await this.documentRepository.findOneBy({
        employee: { id: data.employeeId },
        documentType: { id: documentTypeId },
      });

      if (existing) {
        throw new ConflictException(
          `Tipo de documento ${documentType.name} já está vinculado a esse colaborador.`,
        );
      }

      const document = this.documentRepository.create({
        employee,
        documentType,
        status: 'PENDING',
      });

      await this.documentRepository.save(document);
    }
  }

  async unlinkDocumentTypes(data: LinkDocumentTypesDto): Promise<void> {
    const employee = await this.employeeService.findOne(data.employeeId);

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    for (const documentTypeId of data.documentTypeIds) {
      const document = await this.documentRepository.findOneBy({
        employee: { id: data.employeeId },
        documentType: { id: documentTypeId },
      });

      if (!document) {
        throw new NotFoundException(
          `Tipo de documento ${documentTypeId} não está vinculado com esse colaborador.`,
        );
      }

      await this.documentRepository.remove(document);
    }
  }

  async submitDocument(data: CreateDocumentDto): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: {
        employee: { id: data.employeeId },
        documentType: { id: data.documentTypeId },
      },
      relations: ['employee', 'documentType'],
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado.');
    }

    if (document.status === 'SUBMITTED') {
      throw new ConflictException('Documento já foi enviado.');
    }

    document.status = 'SUBMITTED';

    return this.documentRepository.save(document);
  }

  async findEmployeeDocumentStatus(employeeId: string): Promise<Document[]> {
    const employee = await this.employeeService.findOne(employeeId);

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    return this.documentRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['documentType'],
    });
  }

  async listPendingDocuments(
    query: PendingDocumentsQueryDto,
  ): Promise<Paginated<Document>> {
    const { page, pageSize, employeeId, documentTypeId } = query;

    const qb = this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.employee', 'employee')
      .leftJoinAndSelect('document.documentType', 'documentType')
      .where('document.status = :status', { status: 'PENDING' });

    if (employeeId) {
      qb.andWhere('document.employee_id = :employeeId', { employeeId });
    }

    if (documentTypeId) {
      qb.andWhere('document.document_type_id = :documentTypeId', {
        documentTypeId,
      });
    }

    const finalPage = page ?? 1;
    const finalPageSize = pageSize ?? 10;

    const [data, total] = await qb
      .skip((finalPage - 1) * finalPageSize)
      .take(pageSize)
      .getManyAndCount();

    return paginate(data, total, finalPage, finalPageSize);
  }
}
