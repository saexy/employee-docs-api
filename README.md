# API de Gerenciamento de Documentação de Colaboradores

Uma API RESTful construída com **NestJS**, **PostgreSQL** e **TypeORM** para gerenciar documentação obrigatória de colaboradores. Permite vincular, enviar e consultar o status de documentos. O projeto utiliza DTOs, Swagger para documentação da API e migrations para gerenciamento do banco de dados.

## Funcionalidades

- Cadastro e atualização de colaboradores
- Cadastro de tipos de documentos
- Vinculação/desvinculação de múltiplos tipos de documentos a colaboradores
- Envio de documentos para colaboradores
- Consulta do status de documentos de um colaborador
- Listagem de documentos pendentes com paginação e filtros
- Documentação Swagger
- Migrations automáticas no deploy

## Tecnologias

- **NestJS**: Framework backend
- **PostgreSQL**: Banco de dados
- **TypeORM**: ORM para operações no banco
- **Swagger**: Documentação da API
- **TypeScript**: Linguagem

## Configuração

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v13 ou superior)
- npm

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/saexy/employee-docs-api.git
   cd employee-documentation-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com:
   ```env
   ENV=dev
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=sua_senha
   DATABASE_NAME=employee_docs
   ```

4. Execute as migrations:
   ```bash
   npm run migration:run
   ```

5. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

6. Acesse a API:
   - Local: `http://localhost:3000`
   - Swagger: `http://localhost:3000/docs`

## Deploy

A API está implantada em:  
**https://employee-docs-api.nickolasveiga.com/**  
Swagger: **https://employee-docs-api.nickolasveiga.com/docs**

- Migrations são aplicadas automaticamente no deploy.
- Hospedado com pipeline CI/CD para atualizações contínuas.

## Endpoints da API

Todos os endpoints estão documentados no Swagger em `/docs`. Veja um resumo:

### Colaboradores

- **POST /employees**
  - Cria um novo colaborador.
  - Corpo: `{ "name": "João Silva", "email": "joao.silva@exemplo.com" }`
  - Resposta: Objeto do colaborador (id, name, email, timestamps).

- **PATCH /employees/:id**
  - Atualiza um colaborador.
  - Parâmetro: `id` (UUID)
  - Corpo: `{ "name": "João Atualizado", "email": "joao.atualizado@exemplo.com" }`
  - Resposta: Objeto do colaborador atualizado.

### Tipos de Documentos

- **POST /document-types**
  - Cria um novo tipo de documento.
  - Corpo: `{ "name": "CPF" }`
  - Resposta: Objeto do tipo de documento (id, name, timestamps).

### Documentos

- **POST /documents/link**
  - Vincula múltiplos tipos de documentos a um colaborador.
  - Corpo: `{ "employeeId": "UUID", "documentTypeIds": ["UUID1", "UUID2"] }`
  - Resposta: 201 Created (sem corpo).

- **DELETE /documents/unlink**
  - Desvincula tipos de documentos de um colaborador.
  - Corpo: `{ "employeeId": "UUID", "documentTypeIds": ["UUID1", "UUID2"] }`
  - Resposta: 200 OK (sem corpo).

- **POST /documents/submit**
  - Envia um documento para um colaborador.
  - Corpo: `{ "employeeId": "UUID", "documentTypeId": "UUID" }`
  - Resposta: Objeto do documento (id, employee, documentType, status, timestamps).

- **GET /documents/status/:employeeId**
  - Consulta o status dos documentos de um colaborador (pendente ou enviado).
  - Parâmetro: `employeeId` (UUID)
  - Resposta: Lista de objetos de documentos.

- **GET /documents/pending**
  - Lista todos os documentos pendentes com paginação e filtros opcionais.
  - Query: `?page=1&pageSize=10&employeeId=UUID&documentTypeId=UUID`
  - Resposta: Resposta paginada `{ data: [documentos], total, page, pageSize }`.

## Executando Migrations

Para aplicar migrations localmente:
```bash
npm run migration:run
```

Para reverter a última migration:
```bash
npm run migration:revert
```

## Observações

- A API usa UUIDs para IDs.
- Validação é feita com `class-validator` nos DTOs.
- Erros retornam mensagens claras (ex.: 404 para não encontrado).
- O projeto é escalável, com estrutura modular e paginação.