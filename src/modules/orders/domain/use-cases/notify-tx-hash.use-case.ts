import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    // TODO: implement
    // 1. findById(orderId) — throw NotFoundException if not found
    // 2. validate order.status === CREATED (can't re-notify)
    // 3. updateStatus(orderId, AWAITING_TRANSFER, { txHashUser: txHash })
    // 4. return updated order
    throw new Error('Not implemented');
  }
}
