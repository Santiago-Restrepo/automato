import { MigrationInterface, QueryRunner } from 'typeorm';

export class FunctionVersion1740537687461 implements MigrationInterface {
  name = 'FunctionVersion1740537687461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "functions" ADD "version" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" DROP CONSTRAINT "UQ_c16b68177fcec6e85aa50922972"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c9501a41f326c00c09f34f52ab" ON "functions" ("name", "version") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c9501a41f326c00c09f34f52ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" ADD CONSTRAINT "UQ_c16b68177fcec6e85aa50922972" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "functions" DROP COLUMN "version"`);
  }
}
