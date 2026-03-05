import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/enums/order-status.enum';
import { OrderType } from '../../../domain/enums/order-type.enum';

export class OrderResponseDto {
  @ApiProperty() id: string;
  @ApiProperty({ enum: OrderType }) type: OrderType;
  @ApiProperty({ enum: OrderStatus }) status: OrderStatus;
  @ApiProperty() inputToken: string;
  @ApiProperty() outputToken: string;
  @ApiProperty() amount: number;
  @ApiProperty() userWallet: string;
  @ApiProperty({ nullable: true }) txHashUser: string | null;
  @ApiProperty({ nullable: true }) txHashSettlement: string | null;
  @ApiProperty({ nullable: true }) errorMessage: string | null;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
