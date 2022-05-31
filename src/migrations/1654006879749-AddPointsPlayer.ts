import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPointsPlayer1654006879749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "player" 
            ADD COLUMN points numeric NOT NULL DEFAULT 0`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "player" 
            DROP COLUMN points`,
        )
    }

}
