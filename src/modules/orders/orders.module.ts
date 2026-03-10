import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BullModule } from '@nestjs/bullmq'; // TODO: re-enable when Redis is ready
import { OrderOrmEntity } from './infrastructure/persistence/order.orm-entity';
import { OrderTypeOrmRepository } from './infrastructure/persistence/order.typeorm.repository';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from './domain/use-cases/create-order.use-case';
import { GetOrderUseCase } from './domain/use-cases/get-order.use-case';
import { NotifyTxHashUseCase } from './domain/use-cases/notify-tx-hash.use-case';
import { VerifyOnchainUseCase } from './domain/use-cases/verify-onchain.use-case';
import { ExecuteTradeUseCase } from './domain/use-cases/execute-trade.use-case';
import { ExecuteSettlementUseCase } from './domain/use-cases/execute-settlement.use-case';
import { OrdersService } from './application/orders.service';
import { OrdersController } from './infrastructure/http/orders.controller';
import { OrderProcessingProcessor } from './infrastructure/queue/order-processing.processor';
import { OrderExpirationCron } from './infrastructure/cron/order-expiration.cron';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { BinanceModule } from '../binance/binance.module';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity]),
    // BullModule.registerQueue({ name: ORDER_QUEUE }), // TODO: re-enable when Redis is ready
    BlockchainModule,
    BinanceModule,
    PricingModule,
  ],
  controllers: [OrdersController],
  providers: [
    { provide: ORDER_REPOSITORY, useClass: OrderTypeOrmRepository },
    CreateOrderUseCase,
    GetOrderUseCase,
    NotifyTxHashUseCase,
    VerifyOnchainUseCase,
    ExecuteTradeUseCase,
    ExecuteSettlementUseCase,
    OrdersService,
    OrderProcessingProcessor,
    OrderExpirationCron,
  ],
})
export class OrdersModule {}
