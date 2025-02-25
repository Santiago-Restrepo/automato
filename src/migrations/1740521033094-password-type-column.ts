import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordTypeColumn1740521033094 implements MigrationInterface {
  name = 'PasswordTypeColumn1740521033094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" bytea NOT NULL`,
    );
  }
}
