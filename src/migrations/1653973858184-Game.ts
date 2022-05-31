import { MigrationInterface, QueryRunner } from "typeorm"

export class Game1653973858184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "game" (
                id uuid DEFAULT uuid_generate_v4() UNIQUE,
                match_id uuid NOT NULL REFERENCES match (id),
                player1_points numeric NOT NULL,
                player2_points numeric NOT NULL,
                game_number numeric NOT NULL
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "game"`,
        )
    }

}
