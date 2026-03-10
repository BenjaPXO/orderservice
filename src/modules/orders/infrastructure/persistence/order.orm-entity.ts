import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderType } from '../../domain/enums/order-type.enum';
import { OrderStatus } from '../../domain/enums/order-status.enum';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderType, enumName: 'order_type_enum' })
  type: OrderType;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    enumName: 'order_status_enum',
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Column({ name: 'input_token', type: 'varchar' })
  inputToken: string;

  @Column({ name: 'output_token', type: 'varchar' })
  outputToken: string;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  amount: number;

  @Index()
  @Column({ name: 'user_wallet', type: 'varchar' })
  userWallet: string;

  @Column({ name: 'tx_hash_user', type: 'varchar', nullable: true })
  txHashUser: string | null;

  @Column({ name: 'tx_hash_settlement', type: 'varchar', nullable: true })
  txHashSettlement: string | null;

  @Column({ name: 'quote_price', type: 'decimal', precision: 20, scale: 8 })
  quotePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  spread: number;

  @Column({ name: 'quote_expires_at', type: 'timestamptz' })
  quoteExpiresAt: Date;

  @Column({ name: 'deposit_address', type: 'varchar' })
  depositAddress: string;

  @Column({ name: 'deposit_amount', type: 'decimal', precision: 20, scale: 8, nullable: true })
  depositAmount: number | null;

  @Column({ name: 'deposit_block', type: 'integer', nullable: true })
  depositBlock: number | null;

  @Column({ name: 'binance_order_id', type: 'varchar', nullable: true })
  binanceOrderId: string | null;

  @Column({ name: 'trade_price', type: 'decimal', precision: 20, scale: 8, nullable: true })
  tradePrice: number | null;

  @Column({ name: 'trade_amount', type: 'decimal', precision: 20, scale: 8, nullable: true })
  tradeAmount: number | null;

  @Column({ name: 'fee_exchange', type: 'decimal', precision: 20, scale: 8, nullable: true })
  feeExchange: number | null;

  @Column({ name: 'fee_spread', type: 'decimal', precision: 20, scale: 8, nullable: true })
  feeSpread: number | null;

  @Column({ name: 'fee_network', type: 'decimal', precision: 20, scale: 8, nullable: true })
  feeNetwork: number | null;

  @Column({ name: 'fee_total', type: 'decimal', precision: 20, scale: 8, nullable: true })
  feeTotal: number | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
