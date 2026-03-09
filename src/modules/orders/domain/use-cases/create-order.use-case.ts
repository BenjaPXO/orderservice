import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.interface';

export interface CreateOrderInput {
  type: OrderType;
  inputToken: string;
  outputToken: string;
  amount: number;
  userWallet: string;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    return this.orderRepository.save({
      type: input.type,
      inputToken: input.inputToken,
      outputToken: input.outputToken,
      amount: input.amount,
      userWallet: input.userWallet,
      status: OrderStatus.CREATED,
    });
  }
}
