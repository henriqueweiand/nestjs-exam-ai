import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1742519126713 implements MigrationInterface {
    name = 'Generated1742519126713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exam_id" uuid NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "unit" character varying NOT NULL, "normal_range" character varying NOT NULL, "normal_range_type" character varying, "group" character varying NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exam" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_url" character varying(200) NOT NULL, "file_checksum" character varying(200) NOT NULL, "external_file_id" character varying(60), "summary" text NOT NULL, "recommendations" text NOT NULL, "collected_date" date, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_76f79c7d02dc78550bcd3470f39" FOREIGN KEY ("exam_id") REFERENCES "exam"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_76f79c7d02dc78550bcd3470f39"`);
        await queryRunner.query(`DROP TABLE "exam"`);
        await queryRunner.query(`DROP TABLE "record"`);
    }

}
