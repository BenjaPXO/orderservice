import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

export interface CreateOrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET';
  quantity: number;
}

export interface CreateOrderResult {
  orderId: string;
  executedQty: string;
  status: string;
}

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = configService.get<string>('binance.baseUrl') ?? 'https://api.binance.com/api/v3';
    this.apiKey = configService.get<string>('binance.apiKey') ?? '';
    this.secretKey = configService.get<string>('binance.secretKey') ?? '';
  }

  private sign(queryString: string): string {
    return crypto.createHmac('sha256', this.secretKey).update(queryString).digest('hex');
  }

  private buildSignedQuery(params: Record<string, string | number>): string {
    const paramsWithTs = { ...params, timestamp: Date.now() };
    const queryString = Object.entries(paramsWithTs)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    return `${queryString}&signature=${this.sign(queryString)}`;
  }

  async createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
    const signedQuery = this.buildSignedQuery({
      symbol: params.symbol,
      side: params.side,
      type: params.type,
      quantity: params.quantity,
    });

    this.logger.log(`POST /order — ${params.side} ${params.quantity} ${params.symbol}`);

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.baseUrl}/order?${signedQuery}`,
        null,
        { headers: { 'X-MBX-APIKEY': this.apiKey } },
      ),
    );

    // Binance returns orderId as number — normalize to string for storage
    return {
      orderId: String(data.orderId),
      executedQty: data.executedQty,
      status: data.status,
    };
  }

  async getPrice(symbol: string): Promise<{ symbol: string; price: string }> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/ticker/price`, { params: { symbol } }),
    );
    return { symbol: data.symbol, price: data.price };
  }
}
