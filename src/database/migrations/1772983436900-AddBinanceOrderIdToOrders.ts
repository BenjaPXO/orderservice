import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBinanceOrderIdToOrders1772983436900 implements MigrationInterface {
    name = 'AddBinanceOrderIdToOrders1772983436900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "binance_order_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "binance_order_id"`);
    }

}
