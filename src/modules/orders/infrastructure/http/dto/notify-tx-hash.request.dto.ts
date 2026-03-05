import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class NotifyTxHashRequestDto {
  @ApiProperty({ example: '0xabc123...', description: 'On-chain transaction hash' })
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{64}$/, { message: 'txHash must be a valid 0x-prefixed 32-byte hex string' })
  txHash: string;
}
