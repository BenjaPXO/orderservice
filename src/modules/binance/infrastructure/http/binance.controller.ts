import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../../../../common/guards/api-key.guard';
import { BinanceService } from '../../application/binance.service';

@ApiTags('Binance')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('ping')
  @ApiOperation({ summary: 'Test Binance API connectivity' })
  ping() {
    return this.binanceService.ping();
  }

  @Get('price')
  @ApiOperation({ summary: 'Get current price for a symbol' })
  @ApiQuery({ name: 'symbol', example: 'USDTMXN' })
  getPrice(@Query('symbol') symbol: string) {
    return this.binanceService.getPrice(symbol);
  }
}
