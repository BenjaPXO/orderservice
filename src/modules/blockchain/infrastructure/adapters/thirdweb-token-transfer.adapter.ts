import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenTransferService, TransferResult } from '../../domain/ports/token-transfer.port';

@Injectable()
export class ThirdwebTokenTransferAdapter implements ITokenTransferService {
  constructor(private readonly configService: ConfigService) {}

  async sendPxoToUser(toAddress: string, amount: number): Promise<TransferResult> {
    // TODO: implement using thirdweb SDK
    // 1. Get treasury wallet (decrypt private key if encrypted)
    // 2. prepareContractCall → sendTransaction
    // 3. Poll receipt (every 2s, timeout 60s)
    // 4. Return txHash
    throw new Error('Not implemented');
  }

  async subsidizeGas(walletAddress: string): Promise<TransferResult> {
    // TODO: implement gas subsidy
    throw new Error('Not implemented');
  }
}
