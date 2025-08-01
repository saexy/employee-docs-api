import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { LinkDocumentTypesDto } from './dto/link-document-types.dto';
import { PendingDocumentsQueryDto } from './dto/pending-documents-query.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Document } from './entities/document.entity';
import { Paginated } from '../../common/interfaces/paginated.interface';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('status/:employeeId')
  @ApiOperation({ summary: 'Busca o status dos documentos do colaborador.' })
  @ApiResponse({
    status: 200,
    description: 'Status dos documentos do colaborador.',
    type: [Document],
  })
  findEmployeeDocumentStatus(
    @Param('employeeId') employeeId: string,
  ): Promise<Document[]> {
    return this.documentService.findEmployeeDocumentStatus(employeeId);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Lista todos os documentos pendentes.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de documentos pendentes.',
  })
  listPendingDocuments(
    @Query() query: PendingDocumentsQueryDto,
  ): Promise<Paginated<Document>> {
    return this.documentService.listPendingDocuments(query);
  }

  @Post('link')
  @ApiOperation({ summary: 'Vincula tipos de documento a um colaborador.' })
  @ApiResponse({ status: 201, description: 'Tipos de documento vinculados.' })
  linkDocumentTypes(@Body() data: LinkDocumentTypesDto): Promise<void> {
    return this.documentService.linkDocumentTypes(data);
  }

  @Delete('unlink')
  @ApiOperation({ summary: 'Desvincula tipos de documento de um colaborador.' })
  @ApiResponse({
    status: 200,
    description: 'Tipos de documento desvinculados.',
  })
  unlinkDocumentTypes(@Body() data: LinkDocumentTypesDto): Promise<void> {
    return this.documentService.unlinkDocumentTypes(data);
  }

  @Post('submit')
  @ApiOperation({ summary: 'Enviar um documento.' })
  @ApiResponse({
    status: 200,
    description: 'Documento enviado.',
    type: Document,
  })
  submitDocument(@Body() data: CreateDocumentDto): Promise<Document> {
    return this.documentService.submitDocument(data);
  }
}
