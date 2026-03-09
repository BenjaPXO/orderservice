import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BinanceService } from './application/binance.service';
import { BinanceHttpAdapter } from './infrastructure/adapters/binance-http.adapter';
import { BinanceController } from './infrastructure/http/binance.controller';
import { BINANCE_TRADER } from './domain/ports/binance-trader.port';

@Module({
  imports: [HttpModule],
  controllers: [BinanceController],
  providers: [
    BinanceService,
    { provide: BINANCE_TRADER, useClass: BinanceHttpAdapter },
  ],
  exports: [BinanceService, BINANCE_TRADER],
})
export class BinanceModule {}
