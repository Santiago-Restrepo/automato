import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1737750260768 implements MigrationInterface {
  name = 'InitialMigration1737750260768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "functions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_c16b68177fcec6e85aa50922972" UNIQUE ("name"), CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "function_parameters" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "key" character varying(255) NOT NULL, "function_id" integer NOT NULL, CONSTRAINT "PK_cd5e21093c471bff558ee9d82bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a22a42da419798975e68dfba19" ON "function_parameters" ("key", "function_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "step_parameters" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" jsonb, "function_parameter_id" integer, "output_step_id" uuid, "input_step_id" uuid NOT NULL, CONSTRAINT "PK_e4b171a4da22b6e703c87b6a71b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "steps" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "order" integer NOT NULL, "flow_id" uuid NOT NULL, "function_id" integer, CONSTRAINT "PK_65f86ac8996204d11f915f66a5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "triggers" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "is_active" boolean NOT NULL DEFAULT true, "payload_key" character varying(255) NOT NULL, "flow_id" uuid NOT NULL, CONSTRAINT "PK_c32a7768b269f07efe1fdca3216" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."executions_type_enum" AS ENUM('TRIGGER', 'FLOW', 'STEP')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."executions_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILURE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "executions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "type" "public"."executions_type_enum" NOT NULL, "parent_execution_id" integer, "reference_trigger_id" uuid, "reference_flow_id" uuid, "reference_step_id" uuid, "status" "public"."executions_status_enum" NOT NULL DEFAULT 'PENDING', "error_message" text, "input" jsonb, "output" jsonb, "started_at" TIMESTAMP NOT NULL DEFAULT now(), "finished_at" TIMESTAMP, CONSTRAINT "PK_703e64e0ef651986191844b7b8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "integrations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_4f27d3a6f2315710a44f7a6a178" UNIQUE ("name"), CONSTRAINT "PK_9adcdc6d6f3922535361ce641e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flow_integrations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "integration_id" integer NOT NULL, "flow_id" uuid NOT NULL, "encrypted_secret" bytea NOT NULL, CONSTRAINT "PK_4f6d398db7d776b774b2e43555e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7ef872cb4b7abaa7714d40e6c5" ON "flow_integrations" ("integration_id", "flow_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "flows" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), CONSTRAINT "PK_c346955f4318ef565e6928462fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "function_parameters" ADD CONSTRAINT "FK_8eb3fcf37c641cfb3cfa3600fb3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_parameters" ADD CONSTRAINT "FK_65747ce5af375bb8d8eb319c8a6" FOREIGN KEY ("output_step_id") REFERENCES "steps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_parameters" ADD CONSTRAINT "FK_01f637a0ed4b9a2e606f62a5a51" FOREIGN KEY ("input_step_id") REFERENCES "steps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_parameters" ADD CONSTRAINT "FK_8ac34f99fda93ef5d24cba8aa61" FOREIGN KEY ("function_parameter_id") REFERENCES "function_parameters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "steps" ADD CONSTRAINT "FK_1aace51b4b7c38a55a23366151b" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "steps" ADD CONSTRAINT "FK_0539344bd06893d42428b3a1ef7" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "triggers" ADD CONSTRAINT "FK_a7602984247fbf6549c3f6b03b2" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_6bcba1a732e88900997f8bc3b11" FOREIGN KEY ("parent_execution_id") REFERENCES "executions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_b732d0ee689ae6dc83607f6c7d9" FOREIGN KEY ("reference_trigger_id") REFERENCES "triggers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_5b7c890bf2037255d825a1a4066" FOREIGN KEY ("reference_flow_id") REFERENCES "flows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_a3ec18c2c0eafe77045c5bd215b" FOREIGN KEY ("reference_step_id") REFERENCES "steps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integrations" ADD CONSTRAINT "FK_7d8fad4fb77f47927e18784a337" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integrations" ADD CONSTRAINT "FK_328789507c537d3aed8cb47b575" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flow_integrations" DROP CONSTRAINT "FK_328789507c537d3aed8cb47b575"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flow_integrations" DROP CONSTRAINT "FK_7d8fad4fb77f47927e18784a337"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_a3ec18c2c0eafe77045c5bd215b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_5b7c890bf2037255d825a1a4066"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_b732d0ee689ae6dc83607f6c7d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_6bcba1a732e88900997f8bc3b11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "triggers" DROP CONSTRAINT "FK_a7602984247fbf6549c3f6b03b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "steps" DROP CONSTRAINT "FK_0539344bd06893d42428b3a1ef7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "steps" DROP CONSTRAINT "FK_1aace51b4b7c38a55a23366151b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_parameters" DROP CONSTRAINT "FK_8ac34f99fda93ef5d24cba8aa61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_parameters" DROP CONSTRAINT "FK_01f637a0ed4b9a2e606f62a5a51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_parameters" DROP CONSTRAINT "FK_65747ce5af375bb8d8eb319c8a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "function_parameters" DROP CONSTRAINT "FK_8eb3fcf37c641cfb3cfa3600fb3"`,
    );
    await queryRunner.query(`DROP TABLE "flows"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7ef872cb4b7abaa7714d40e6c5"`,
    );
    await queryRunner.query(`DROP TABLE "flow_integrations"`);
    await queryRunner.query(`DROP TABLE "integrations"`);
    await queryRunner.query(`DROP TABLE "executions"`);
    await queryRunner.query(`DROP TYPE "public"."executions_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."executions_type_enum"`);
    await queryRunner.query(`DROP TABLE "triggers"`);
    await queryRunner.query(`DROP TABLE "steps"`);
    await queryRunner.query(`DROP TABLE "step_parameters"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a22a42da419798975e68dfba19"`,
    );
    await queryRunner.query(`DROP TABLE "function_parameters"`);
    await queryRunner.query(`DROP TABLE "functions"`);
  }
}
