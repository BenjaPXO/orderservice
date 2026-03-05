import { Injectable, Logger } from '@nestjs/common';
import { BinanceService } from '../../application/binance.service';
import {
  IBinanceTrader,
  MarketOrderResult,
} from '../../domain/ports/binance-trader.port';

@Injectable()
export class BinanceHttpAdapter implements IBinanceTrader {
  private readonly logger = new Logger(BinanceHttpAdapter.name);

  constructor(private readonly binanceService: BinanceService) {}

  async executeMarketOrder(
    symbol: string,
    side: 'BUY' | 'SELL',
    quantity: number,
  ): Promise<MarketOrderResult> {
    // TODO: implement
    // 1. Call this.binanceService.createOrder({ symbol, side, type: 'MARKET', quantity })
    // 2. binanceService.createOrder() handles HMAC signing via sign()
    // 3. Parse response: { orderId, executedQty, status }
    // 4. Return MarketOrderResult
    this.logger.warn(`executeMarketOrder not implemented — ${side} ${quantity} ${symbol}`);
    throw new Error('Not implemented');
  }
}
