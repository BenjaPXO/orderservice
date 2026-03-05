import { Module } from '@nestjs/common';
import { TOKEN_TRANSFER_SERVICE } from './domain/ports/token-transfer.port';
import { ONCHAIN_VERIFIER } from './domain/ports/onchain-verifier.port';
import { ThirdwebTokenTransferAdapter } from './infrastructure/adapters/thirdweb-token-transfer.adapter';
import { ViemOnchainVerifierAdapter } from './infrastructure/adapters/viem-onchain-verifier.adapter';
import { BlockchainService } from './application/blockchain.service';

@Module({
  providers: [
    { provide: TOKEN_TRANSFER_SERVICE, useClass: ThirdwebTokenTransferAdapter },
    { provide: ONCHAIN_VERIFIER, useClass: ViemOnchainVerifierAdapter },
    BlockchainService,
  ],
  exports: [BlockchainService, TOKEN_TRANSFER_SERVICE, ONCHAIN_VERIFIER],
})
export class BlockchainModule {}
