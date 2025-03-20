import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1742252031915 implements MigrationInterface {
    name = 'Generated1742252031915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" ADD "external_file_id" character varying(60)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "external_file_id"`);
    }

}
