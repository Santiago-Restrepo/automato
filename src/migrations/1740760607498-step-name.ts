import { MigrationInterface, QueryRunner } from 'typeorm';

export class StepName1740760607498 implements MigrationInterface {
  name = 'StepName1740760607498';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "steps" ADD "name" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "steps" DROP COLUMN "name"`);
  }
}
