import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';

export const ORDER_REPOSITORY = Symbol('IOrderRepository');

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Partial<Order>): Promise<Order>;
  updateStatus(
    id: string,
    status: OrderStatus,
    extra?: Partial<Order>,
  ): Promise<void>;
}
