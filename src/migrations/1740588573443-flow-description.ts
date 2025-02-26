import { MigrationInterface, QueryRunner } from 'typeorm';

export class FlowDescription1740588573443 implements MigrationInterface {
  name = 'FlowDescription1740588573443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flows" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "flows" ALTER COLUMN "name" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flows" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "flows" DROP COLUMN "description"`);
  }
}
