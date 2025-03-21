import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1742592225353 implements MigrationInterface {
    name = 'Generated1742592225353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" ADD "user_id" character varying(32) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "user_id"`);
    }

}
