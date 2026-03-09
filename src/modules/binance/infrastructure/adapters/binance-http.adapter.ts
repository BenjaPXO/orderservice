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
    this.logger.log(`Executing market order: ${side} ${quantity} ${symbol}`);
    const result = await this.binanceService.createOrder({ symbol, side, type: 'MARKET', quantity });
    return {
      orderId: result.orderId,
      executedQty: result.executedQty,
      status: result.status,
    };
  }
}
