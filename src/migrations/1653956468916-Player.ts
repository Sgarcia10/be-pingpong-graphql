import { MigrationInterface, QueryRunner } from "typeorm"

export class Player1653956468916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "player" (
                id uuid DEFAULT uuid_generate_v4() UNIQUE,
                username VARCHAR ( 50 ) UNIQUE NOT NULL
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "player"`,
        )
    }

}
