import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDocumentTable1754087583012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'document',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'employee_id', type: 'uuid' },
          { name: 'document_type_id', type: 'uuid' },
          { name: 'status', type: 'varchar', default: "'PENDING'" },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'document',
      new TableForeignKey({
        columnNames: ['employee_id'],
        referencedTableName: 'employee',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'document',
      new TableForeignKey({
        columnNames: ['document_type_id'],
        referencedTableName: 'document_type',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('document', true);
  }
}
