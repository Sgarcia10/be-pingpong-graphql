import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterColumnPointsPlayer1654102865760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "player" 
            ALTER COLUMN points TYPE integer`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "player" 
            ALTER COLUMN points TYPE numeric`,
        )
    }

}
