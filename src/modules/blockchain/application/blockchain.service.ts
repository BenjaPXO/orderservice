import { Inject, Injectable } from '@nestjs/common';
import { ITokenTransferService, TOKEN_TRANSFER_SERVICE } from '../domain/ports/token-transfer.port';

@Injectable()
export class BlockchainService {
  constructor(
    @Inject(TOKEN_TRANSFER_SERVICE)
    private readonly tokenTransfer: ITokenTransferService,
  ) {}

  async sendPxo(toAddress: string, amount: number) {
    return this.tokenTransfer.sendPxoToUser(toAddress, amount);
  }

  async subsidizeGas(walletAddress: string) {
    return this.tokenTransfer.subsidizeGas(walletAddress);
  }
}
