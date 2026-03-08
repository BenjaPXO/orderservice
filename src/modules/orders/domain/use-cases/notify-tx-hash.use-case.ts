import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.interface';

@Injectable()
export class NotifyTxHashUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(orderId: string, txHash: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);
    if (order.status !== OrderStatus.CREATED) {
      throw new BadRequestException(`Order already in status ${order.status}`);
    }
    await this.orderRepository.updateStatus(orderId, OrderStatus.AWAITING_TRANSFER, {
      txHashUser: txHash,
    });
    return this.orderRepository.findById(orderId) as Promise<Order>;
  }
}
