import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema1711471408000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enable pgvector extension
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

        // Create users table
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "hashed_password",
                        type: "varchar",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["student", "professor", "admin"],
                        default: "'student'",
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "last_login_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        // Create legal_documents table
        await queryRunner.createTable(
            new Table({
                name: "legal_documents",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "content",
                        type: "text",
                    },
                    {
                        name: "tags",
                        type: "text[]",
                        isNullable: true,
                    },
                    {
                        name: "document_type",
                        type: "varchar",
                    },
                    {
                        name: "citations",
                        type: "text[]",
                        isNullable: true,
                    },
                    {
                        name: "embedding",
                        type: "decimal[]",
                        isNullable: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "last_accessed_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "metadata",
                        type: "jsonb",
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        // Add foreign key
        await queryRunner.createForeignKey(
            "legal_documents",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX idx_legal_documents_embedding ON legal_documents USING gin (embedding);
            CREATE INDEX idx_legal_documents_document_type ON legal_documents (document_type);
            CREATE INDEX idx_legal_documents_created_at ON legal_documents (created_at);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("legal_documents");
        await queryRunner.dropTable("users");
        await queryRunner.query(`DROP EXTENSION IF EXISTS vector;`);
    }
}
