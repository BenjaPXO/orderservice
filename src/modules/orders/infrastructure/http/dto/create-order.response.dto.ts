import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  @ApiProperty() orderId: string;
  @ApiProperty() depositWallet: string;
  @ApiProperty() token: string;
  @ApiProperty() amount: number;
  @ApiProperty() quotePrice: number;
}
