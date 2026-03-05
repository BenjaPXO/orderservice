import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { OrderOrmEntity } from './infrastructure/persistence/order.orm-entity';
import { OrderTypeOrmRepository } from './infrastructure/persistence/order.typeorm.repository';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository.interface';
import { CreateOrderUseCase } from './domain/use-cases/create-order.use-case';
import { NotifyTxHashUseCase } from './domain/use-cases/notify-tx-hash.use-case';
import { VerifyOnchainUseCase } from './domain/use-cases/verify-onchain.use-case';
import { ExecuteTradeUseCase } from './domain/use-cases/execute-trade.use-case';
import { ExecuteSettlementUseCase } from './domain/use-cases/execute-settlement.use-case';
import { OrdersService, ORDER_QUEUE } from './application/orders.service';
import { OrdersController } from './infrastructure/http/orders.controller';
import { OrderProcessingProcessor } from './infrastructure/queue/order-processing.processor';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { BinanceModule } from '../binance/binance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity]),
    BullModule.registerQueue({ name: ORDER_QUEUE }),
    BlockchainModule,
    BinanceModule,
  ],
  controllers: [OrdersController],
  providers: [
    { provide: ORDER_REPOSITORY, useClass: OrderTypeOrmRepository },
    CreateOrderUseCase,
    NotifyTxHashUseCase,
    VerifyOnchainUseCase,
    ExecuteTradeUseCase,
    ExecuteSettlementUseCase,
    OrdersService,
    OrderProcessingProcessor,
  ],
})
export class OrdersModule {}
