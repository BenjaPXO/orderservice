import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ONCHAIN_VERIFIER,
  IOnchainVerifier,
} from '../../../blockchain/domain/ports/onchain-verifier.port';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.interface';
import { OrderStatus } from '../enums/order-status.enum';
import { Order } from '../entities/order.entity';

@Injectable()
export class VerifyOnchainUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(ONCHAIN_VERIFIER)
    private readonly onchainVerifier: IOnchainVerifier,
    private readonly configService: ConfigService,
  ) {}

  async execute(order: Order): Promise<void> {
    // TODO: implement
    // 1. depositWallet = configService.get('DEPOSIT_WALLET_ADDRESS')
    // 2. result = await onchainVerifier.verifyTransfer(order.txHashUser!, depositWallet)
    // 3. validate result.confirmed === true
    // 4. updateStatus(order.id, FUNDS_RECEIVED)
    throw new Error('Not implemented');
  }
}
