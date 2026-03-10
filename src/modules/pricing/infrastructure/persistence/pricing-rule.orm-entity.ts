import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pricing_rules')
export class PricingRuleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  pair: string;

  @Column({ name: 'spread_buy', type: 'numeric', nullable: true })
  spreadBuy: number | null;

  @Column({ name: 'spread_sell', type: 'numeric', nullable: true })
  spreadSell: number | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
