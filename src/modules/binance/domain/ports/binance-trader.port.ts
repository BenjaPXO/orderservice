export const BINANCE_TRADER = Symbol('IBinanceTrader');

export interface MarketOrderResult {
  /** Binance orderId for audit logging */
  orderId: string;
  executedQty: string;
  status: string;
}

export interface IBinanceTrader {
  /**
   * Executes a market order on Binance institutional account.
   *
   * BUY  flow: sell USDT → MXN  → symbol='USDTMXN', side='SELL'
   * SELL flow: buy  USDT ← MXN  → symbol='USDTMXN', side='BUY'
   */
  executeMarketOrder(
    symbol: string,
    side: 'BUY' | 'SELL',
    quantity: number,
  ): Promise<MarketOrderResult>;
}
