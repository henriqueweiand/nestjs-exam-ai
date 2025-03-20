import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1742508662439 implements MigrationInterface {
    name = 'Generated1742508662439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "file_url"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "file_url" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "file_checksum"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "file_checksum" character varying(120) NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "file_checksum"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "file_checksum" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "file_url"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "file_url" character varying(200) NOT NULL`);
    }

}
