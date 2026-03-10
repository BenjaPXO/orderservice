import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuoteAndFeeFieldsToOrders1773168423614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM orders`);

    await queryRunner.query(`
      ALTER TABLE orders
        ADD COLUMN quote_price      decimal(20,8) NOT NULL,
        ADD COLUMN spread           decimal(10,6) NOT NULL,
        ADD COLUMN quote_expires_at timestamptz   NOT NULL,
        ADD COLUMN deposit_address  varchar       NOT NULL,
        ADD COLUMN deposit_amount   decimal(20,8) NULL,
        ADD COLUMN deposit_block    integer       NULL,
        ADD COLUMN trade_price      decimal(20,8) NULL,
        ADD COLUMN trade_amount     decimal(20,8) NULL,
        ADD COLUMN fee_exchange     decimal(20,8) NULL,
        ADD COLUMN fee_spread       decimal(20,8) NULL,
        ADD COLUMN fee_network      decimal(20,8) NULL,
        ADD COLUMN fee_total        decimal(20,8) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE orders
        DROP COLUMN IF EXISTS quote_price,
        DROP COLUMN IF EXISTS spread,
        DROP COLUMN IF EXISTS quote_expires_at,
        DROP COLUMN IF EXISTS deposit_address,
        DROP COLUMN IF EXISTS deposit_amount,
        DROP COLUMN IF EXISTS deposit_block,
        DROP COLUMN IF EXISTS trade_price,
        DROP COLUMN IF EXISTS trade_amount,
        DROP COLUMN IF EXISTS fee_exchange,
        DROP COLUMN IF EXISTS fee_spread,
        DROP COLUMN IF EXISTS fee_network,
        DROP COLUMN IF EXISTS fee_total
    `);
  }
}
