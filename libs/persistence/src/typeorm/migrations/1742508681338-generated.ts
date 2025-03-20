import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1742508681338 implements MigrationInterface {
    name = 'Generated1742508681338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "external_file_id"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "external_file_id" character varying(60)`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "collected_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "collected_date" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "collected_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "collected_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "external_file_id"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "external_file_id" character varying(120)`);
    }

}
