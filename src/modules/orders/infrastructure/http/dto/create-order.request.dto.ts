import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsEthereumAddress,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { OrderType } from '../../../domain/enums/order-type.enum';

export class CreateOrderRequestDto {
  @ApiProperty({ enum: OrderType, example: OrderType.BUY })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({ example: 'USDT' })
  @IsString()
  @IsNotEmpty()
  inputToken: string;

  @ApiProperty({ example: 'PXO' })
  @IsString()
  @IsNotEmpty()
  outputToken: string;

  @ApiProperty({ example: 100.5, description: 'Amount in input token' })
  @IsPositive()
  amount: number;

  @ApiProperty({ example: '0xabc123...', description: 'User ETH wallet address' })
  @IsEthereumAddress()
  userWallet: string;
}
