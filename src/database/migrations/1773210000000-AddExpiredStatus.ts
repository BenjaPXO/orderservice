import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpiredStatus1773210000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE order_status_enum ADD VALUE IF NOT EXISTS 'EXPIRED'`,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL does not support removing values from an enum type.
    // Manual DROP/RECREATE of the type is required to rollback.
  }
}
