import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/order.repository.interface';
import { OrderStatus } from '../../domain/enums/order-status.enum';

@Injectable()
export class OrderExpirationCron {
  private readonly logger = new Logger(OrderExpirationCron.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async expireStaleOrders(): Promise<void> {
    const expired = await this.orderRepository.findExpiredOrders();
    for (const order of expired) {
      await this.orderRepository.updateStatus(order.id, OrderStatus.EXPIRED);
      this.logger.log({ event: 'ORDER_EXPIRED', orderId: order.id });
    }
  }
}
