import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { VerifyOnchainUseCase } from '../../domain/use-cases/verify-onchain.use-case';
import { ExecuteTradeUseCase } from '../../domain/use-cases/execute-trade.use-case';
import { ExecuteSettlementUseCase } from '../../domain/use-cases/execute-settlement.use-case';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/order.repository.interface';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { Inject } from '@nestjs/common';
import { ORDER_QUEUE } from '../../application/orders.service';

export interface OrderJobPayload {
  orderId: string;
}

@Processor(ORDER_QUEUE, { concurrency: 5 })
export class OrderProcessingProcessor extends WorkerHost {
  private readonly logger = new Logger(OrderProcessingProcessor.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly verifyOnchainUseCase: VerifyOnchainUseCase,
    private readonly executeTradeUseCase: ExecuteTradeUseCase,
    private readonly executeSettlementUseCase: ExecuteSettlementUseCase,
  ) {
    super();
  }

  async process(job: Job<OrderJobPayload>): Promise<void> {
    const { orderId } = job.data;
    this.logger.log(`Processing order ${orderId} — attempt ${job.attemptsMade + 1}`);

    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      this.logger.error(`Order ${orderId} not found in DB`);
      return;
    }

    // Idempotent pipeline: resume from current status
    switch (order.status) {
      case OrderStatus.AWAITING_TRANSFER:
        // TODO: call verifyOnchainUseCase.execute(order) → FUNDS_RECEIVED
        // then fall through to FUNDS_RECEIVED case
        throw new Error('verifyOnchain not implemented');

      case OrderStatus.FUNDS_RECEIVED:
        // TODO: call executeTradeUseCase.execute(order) → PROCESSING
        // then fall through to PROCESSING case
        throw new Error('executeTrade not implemented');

      case OrderStatus.PROCESSING:
        // TODO: call executeSettlementUseCase.execute(order) → SETTLED
        throw new Error('executeSettlement not implemented');

      case OrderStatus.SETTLED:
        this.logger.log(`Order ${orderId} already SETTLED — skipping`);
        return;

      case OrderStatus.FAILED:
        this.logger.warn(`Order ${orderId} is FAILED — skipping`);
        return;

      default:
        this.logger.warn(`Order ${orderId} has unexpected status: ${order.status}`);
        return;
    }
  }
}
