import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { CreateOrderUseCase, CreateOrderInput } from '../domain/use-cases/create-order.use-case';
import { NotifyTxHashUseCase } from '../domain/use-cases/notify-tx-hash.use-case';
import { Order } from '../domain/entities/order.entity';

export const ORDER_QUEUE = 'order-processing';

@Injectable()
export class OrdersService {
  constructor(
    @InjectQueue(ORDER_QUEUE) private readonly orderQueue: Queue,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly notifyTxHashUseCase: NotifyTxHashUseCase,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(input: CreateOrderInput): Promise<{
    orderId: string;
    status: string;
    depositWallet: string;
  }> {
    const order = await this.createOrderUseCase.execute(input);
    const depositWallet = this.configService.get<string>('blockchain.depositWalletAddress') ?? '';
    return { orderId: order.id, status: order.status, depositWallet };
  }

  async getOrder(orderId: string): Promise<Order> {
    // TODO: inject GetOrderUseCase and call execute(orderId)
    throw new Error('Not implemented');
  }

  async notifyTxHash(orderId: string, txHash: string): Promise<Order> {
    const order = await this.notifyTxHashUseCase.execute(orderId, txHash);
    // Enqueue job — jobId = orderId for deterministic deduplication
    await this.orderQueue.add(
      'process-order',
      { orderId: order.id },
      {
        jobId: order.id,
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      },
    );
    return order;
  }
}
