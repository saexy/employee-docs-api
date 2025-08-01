import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Employee Docs API')
  .setDescription(
    'API para gerenciamento e acompanhamento do fluxo de documentação obrigatória de colaboradores.',
  )
  .setVersion('1.0')
  .build();
