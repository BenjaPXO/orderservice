import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1772823981437 implements MigrationInterface {
    name = 'CreateOrdersTable1772823981437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_type_enum" AS ENUM('BUY', 'SELL')`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('CREATED', 'AWAITING_TRANSFER', 'FUNDS_RECEIVED', 'PROCESSING', 'SETTLED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."order_type_enum" NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'CREATED', "input_token" character varying NOT NULL, "output_token" character varying NOT NULL, "amount" numeric(20,8) NOT NULL, "user_wallet" character varying NOT NULL, "tx_hash_user" character varying, "tx_hash_settlement" character varying, "error_message" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2701e62b9db0fb2b0ed64762bd" ON "orders" ("user_wallet") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2701e62b9db0fb2b0ed64762bd"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_type_enum"`);
    }

}
