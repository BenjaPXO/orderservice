import { Injectable } from '@nestjs/common';
// import { InjectQueue } from '@nestjs/bullmq'; // TODO: re-enable when Redis is ready
// import { Queue } from 'bullmq';
import { CreateOrderUseCase, CreateOrderInput } from '../domain/use-cases/create-order.use-case';
import { GetOrderUseCase } from '../domain/use-cases/get-order.use-case';
import { NotifyTxHashUseCase } from '../domain/use-cases/notify-tx-hash.use-case';
import { Order } from '../domain/entities/order.entity';
import { CreateOrderResponseDto } from '../infrastructure/http/dto/create-order.response.dto';

export const ORDER_QUEUE = 'order-processing';

@Injectable()
export class OrdersService {
  constructor(
    // @InjectQueue(ORDER_QUEUE) private readonly orderQueue: Queue, // TODO: re-enable when Redis is ready
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly notifyTxHashUseCase: NotifyTxHashUseCase,
  ) {}

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResponseDto> {
    const order = await this.createOrderUseCase.execute(input);
    return {
      orderId: order.id,
      depositAddress: order.depositAddress,
      inputToken: order.inputToken,
      outputToken: order.outputToken,
      amount: order.amount,
      quotePrice: order.quotePrice,
      spread: order.spread,
      quoteExpiresAt: order.quoteExpiresAt,
    };
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.getOrderUseCase.execute(orderId);
  }

  async notifyTxHash(orderId: string, txHash: string): Promise<Order> {
    const order = await this.notifyTxHashUseCase.execute(orderId, txHash);
    // TODO: re-enable queue when Redis is ready
    // await this.orderQueue.add('process-order', { orderId: order.id }, {
    //   jobId: order.id,
    //   attempts: 3,
    //   backoff: { type: 'exponential', delay: 1000 },
    // });
    return order;
  }
}
