import { Inject, Injectable } from '@nestjs/common';
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
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(BINANCE_TRADER)
    private readonly binanceTrader: IBinanceTrader,
  ) {}

  async execute(order: Order): Promise<void> {
    // TODO: implement
    // BUY  flow: user sent USDt → sell USDt → MXN on Binance
    //   symbol='USDTMXN', side='SELL', quantity=order.amount
    // SELL flow: user sent PXO → buy USDt ← MXN on Binance
    //   symbol='USDTMXN', side='BUY', quantity=order.amount
    //
    // 1. determine symbol + side from order.type
    // 2. result = await binanceTrader.executeMarketOrder(symbol, side, order.amount)
    // 3. updateStatus(order.id, PROCESSING, { binanceOrderId: result.orderId }) — add binanceOrderId to schema if needed
    // 4. on error: updateStatus(order.id, FAILED, { errorMessage }) + throw to trigger retry
    throw new Error('Not implemented');
  }
}
