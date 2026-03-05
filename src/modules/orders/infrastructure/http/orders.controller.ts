import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../../../../common/guards/api-key.guard';
import { OrdersService } from '../../application/orders.service';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import { NotifyTxHashRequestDto } from './dto/notify-tx-hash.request.dto';

@ApiTags('Orders')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order (BUY or SELL)' })
  createOrder(@Body() dto: CreateOrderRequestDto) {
    return this.ordersService.createOrder({
      type: dto.type,
      inputToken: dto.inputToken,
      outputToken: dto.outputToken,
      amount: dto.amount,
      userWallet: dto.userWallet,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order status and details' })
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @Patch(':id/tx-hash')
  @ApiOperation({ summary: 'Notify backend of user on-chain txHash' })
  notifyTxHash(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: NotifyTxHashRequestDto,
  ) {
    return this.ordersService.notifyTxHash(id, dto.txHash);
  }
}
