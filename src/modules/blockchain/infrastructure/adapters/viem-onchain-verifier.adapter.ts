import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IOnchainVerifier,
  VerifyTransferResult,
} from '../../domain/ports/onchain-verifier.port';

@Injectable()
export class ViemOnchainVerifierAdapter implements IOnchainVerifier {
  private readonly logger = new Logger(ViemOnchainVerifierAdapter.name);

  constructor(private readonly configService: ConfigService) {}

  async verifyTransfer(
    txHash: string,
    expectedWallet: string,
  ): Promise<VerifyTransferResult> {
    // TODO: implement with viem
    // 1. const client = createPublicClient({ chain: polygon, transport: http(POLYGON_RPC_URL) })
    // 2. const receipt = await client.getTransactionReceipt({ hash: txHash })
    // 3. Poll until receipt.blockNumber + 3 <= currentBlock (min 3 confirmations)
    // 4. Parse ERC-20 Transfer log: verify `to` === expectedWallet, return amount + token
    // 5. Return { confirmed: true, amount: BigInt(parsedAmount), token: 'USDT' }
    this.logger.warn(`verifyTransfer not implemented — txHash: ${txHash}`);
    throw new Error('Not implemented');
  }
}
