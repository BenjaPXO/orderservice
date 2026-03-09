import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BINANCE_TRADER,
  IBinanceTrader,
} from '../../../binance/domain/ports/binance-trader.port';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.interface';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';
import { Order } from '../entities/order.entity';

@Injectable()
export class ExecuteTradeUseCase {
  private readonly logger = new Logger(ExecuteTradeUseCase.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(BINANCE_TRADER)
    private readonly binanceTrader: IBinanceTrader,
  ) {}

  async execute(order: Order): Promise<void> {
    const { symbol, side } = order.type === OrderType.BUY
      ? { symbol: 'USDTMXN', side: 'SELL' as const }
      : { symbol: 'USDTMXN', side: 'BUY' as const };

    try {
      const result = await this.binanceTrader.executeMarketOrder(symbol, side, order.amount);
      this.logger.log(`Trade executed — binanceOrderId=${result.orderId} executedQty=${result.executedQty}`);
      await this.orderRepository.updateStatus(order.id, OrderStatus.PROCESSING, {
        binanceOrderId: result.orderId,
      });
    } catch (error) {
      const binanceMsg = (error as any).response?.data?.msg ?? (error as Error).message;
      this.logger.error(`Trade FAILED for order ${order.id}: ${binanceMsg}`);
      await this.orderRepository.updateStatus(order.id, OrderStatus.FAILED, {
        errorMessage: `Binance trade failed: ${binanceMsg}`,
      });
      throw error; // re-throw so BullMQ retries (attempts: 3, backoff: exponential)
    }
  }
}
