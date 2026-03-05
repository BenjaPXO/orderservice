import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class BinanceService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = configService.get<string>('BINANCE_API_BASE_URL', 'https://api.binance.com/api/v3');
    this.apiKey = configService.get<string>('BINANCE_API_KEY', '');
    this.secretKey = configService.get<string>('BINANCE_SECRET_KEY', '');
  }

  private sign(queryString: string): string {
    return crypto.createHmac('sha256', this.secretKey).update(queryString).digest('hex');
  }

  async getPrice(symbol: string): Promise<{ symbol: string; price: string }> {
    // TODO: implement — GET /ticker/price?symbol=MXNUSDT
    throw new Error('Not implemented');
  }

  async getAccount(): Promise<unknown> {
    // TODO: implement — GET /account (requires HMAC signature)
    throw new Error('Not implemented');
  }

  async getAllOrders(symbol: string): Promise<unknown[]> {
    // TODO: implement — GET /allOrders
    throw new Error('Not implemented');
  }

  async createOrder(dto: unknown): Promise<unknown> {
    // TODO: implement — POST /order
    throw new Error('Not implemented');
  }
}
