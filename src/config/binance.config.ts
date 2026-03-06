import { registerAs } from '@nestjs/config';

export default registerAs('binance', () => ({
  baseUrl: process.env.BINANCE_API_BASE_URL ?? 'https://api.binance.com/api/v3',
  apiKey: process.env.BINANCE_API_KEY ?? '',
  secretKey: process.env.BINANCE_SECRET_KEY ?? '',
}));
