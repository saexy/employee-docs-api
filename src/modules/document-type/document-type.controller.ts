import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DocumentType } from './entities/document-type.entity';

@ApiTags('document-type')
@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Get('')
  @ApiOperation({ summary: 'Lista todos os tipos de documento.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de documento.',
    type: [DocumentType],
  })
  list(): Promise<DocumentType[]> {
    return this.documentTypeService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um tipo de documento.' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de documento criado.',
    type: DocumentType,
  })
  create(@Body() data: CreateDocumentTypeDto): Promise<DocumentType> {
    return this.documentTypeService.create(data);
  }
}
