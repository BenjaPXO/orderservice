import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class BinanceService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = configService.get<string>('binance.baseUrl') ?? 'https://api.binance.com/api/v3';
    this.apiKey = configService.get<string>('binance.apiKey') ?? '';
    this.secretKey = configService.get<string>('binance.secretKey') ?? '';
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
