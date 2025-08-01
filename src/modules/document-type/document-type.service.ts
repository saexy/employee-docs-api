import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DocumentType } from './entities/document-type.entity';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  list(): Promise<DocumentType[]> {
    return this.documentTypeRepository.find();
  }

  findOne(id: string): Promise<DocumentType | null> {
    return this.documentTypeRepository.findOne({ where: { id } });
  }

  async create(data: CreateDocumentTypeDto): Promise<DocumentType> {
    const existing = await this.documentTypeRepository.findOneBy({
      name: ILike(data.name),
    });

    if (existing) {
      throw new ConflictException('Esse tipo de documento já existe.');
    }

    const documentType = this.documentTypeRepository.create(data);

    return this.documentTypeRepository.save(documentType);
  }
}
