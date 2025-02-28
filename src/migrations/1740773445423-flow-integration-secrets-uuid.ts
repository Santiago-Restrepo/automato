import { MigrationInterface, QueryRunner } from 'typeorm';

export class FlowIntegrationSecretsUuid1740773445423
  implements MigrationInterface
{
  name = 'FlowIntegrationSecretsUuid1740773445423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" DROP CONSTRAINT "PK_55a062f8543d186b760e7e3b2ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" ADD CONSTRAINT "PK_55a062f8543d186b760e7e3b2ae" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" DROP CONSTRAINT "PK_55a062f8543d186b760e7e3b2ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" ADD CONSTRAINT "PK_55a062f8543d186b760e7e3b2ae" PRIMARY KEY ("id")`,
    );
  }
}
