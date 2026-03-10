import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  @ApiProperty() orderId: string;
  @ApiProperty() depositAddress: string;
  @ApiProperty() inputToken: string;
  @ApiProperty() outputToken: string;
  @ApiProperty() amount: number;
  @ApiProperty() quotePrice: number;
  @ApiProperty() spread: number;
  @ApiProperty() quoteExpiresAt: Date;
}
