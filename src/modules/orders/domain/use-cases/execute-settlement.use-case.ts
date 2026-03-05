import { Inject, Injectable } from '@nestjs/common';
import { BlockchainService } from '../../../blockchain/application/blockchain.service';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.interface';
import { OrderStatus } from '../enums/order-status.enum';
import { Order } from '../entities/order.entity';

@Injectable()
export class ExecuteSettlementUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly blockchainService: BlockchainService,
  ) {}

  async execute(order: Order): Promise<void> {
    // TODO: implement
    // Idempotency check: if txHashSettlement is already set → order already settled, skip
    // 1. if (order.txHashSettlement !== null) return;
    //
    // BUY:  send PXO tokens to order.userWallet
    // SELL: send USDt/MXN — TBD (may need separate transfer method)
    //
    // 2. result = await blockchainService.sendPxo(order.userWallet, order.amount)
    // 3. updateStatus(order.id, SETTLED, { txHashSettlement: result.txHash })
    // 4. on error: updateStatus(order.id, FAILED, { errorMessage }) + throw to trigger retry
    throw new Error('Not implemented');
  }
}
