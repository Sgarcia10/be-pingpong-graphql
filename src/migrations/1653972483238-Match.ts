import { MigrationInterface, QueryRunner } from "typeorm"

export class Match1653972483238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "match" (
                id uuid DEFAULT uuid_generate_v4() UNIQUE,
                player1_id uuid NOT NULL REFERENCES player (id),
                player2_id uuid NOT NULL REFERENCES player (id),
                winner VARCHAR ( 7 ) NOT NULL
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "match"`,
        )
    }

}
