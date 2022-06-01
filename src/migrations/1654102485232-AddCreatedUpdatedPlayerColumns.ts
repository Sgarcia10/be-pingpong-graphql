import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCreatedUpdatedPlayerColumns1654102485232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "player" 
            ADD COLUMN created_at timestamp NOT NULL default CURRENT_TIMESTAMP(6),
            ADD COLUMN updated_at timestamp NOT NULL default CURRENT_TIMESTAMP(6)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "player" 
            DROP COLUMN created_at,
            DROP COLUMN updated_at`,
        )
    }

}
