import { MigrationInterface, QueryRunner } from 'typeorm';

export class FlowIntegrationSecrets1740770651318 implements MigrationInterface {
  name = 'FlowIntegrationSecrets1740770651318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "flow_integration_secrets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "flow_integration_id" integer NOT NULL, "key" character varying NOT NULL, "value" bytea NOT NULL, CONSTRAINT "PK_55a062f8543d186b760e7e3b2ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integrations" DROP COLUMN "encrypted_secret"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" ADD CONSTRAINT "FK_776f894e45d417690b30b666730" FOREIGN KEY ("flow_integration_id") REFERENCES "flow_integrations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flow_integration_secrets" DROP CONSTRAINT "FK_776f894e45d417690b30b666730"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integrations" ADD "encrypted_secret" bytea NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "flow_integration_secrets"`);
  }
}
