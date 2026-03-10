import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BinanceService } from '../../../binance/application/binance.service';
import {
  IPricingRuleRepository,
  PRICING_RULE_REPOSITORY,
} from '../../../pricing/domain/repositories/pricing-rule.repository.interface';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.interface';

const BINANCE_PAIR = 'USDTMXN';
const QUOTE_TTL_MS = 60_000;
const SUPPORTED_PAIRS = new Set(['USDT/PXO', 'PXO/USDT']);

export interface CreateOrderInput {
  type: OrderType;
  inputToken: string;
  outputToken: string;
  amount: number;
  userWallet: string;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(PRICING_RULE_REPOSITORY)
    private readonly pricingRuleRepository: IPricingRuleRepository,
    private readonly binanceService: BinanceService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const pair = `${input.inputToken}/${input.outputToken}`;
    if (!SUPPORTED_PAIRS.has(pair)) {
      throw new BadRequestException(`Unsupported token pair: ${pair}`);
    }

    const rule = await this.pricingRuleRepository.findByPair(BINANCE_PAIR);
    if (!rule) {
      throw new BadRequestException('No pricing rule found for USDTMXN');
    }

    const priceData = await this.binanceService.getPrice(BINANCE_PAIR);
    const spotPrice = parseFloat(priceData.price);

    const spread = input.type === OrderType.BUY ? rule.spreadBuy : rule.spreadSell;
    const quotePrice =
      input.type === OrderType.BUY
        ? spotPrice * (1 + spread)
        : spotPrice * (1 - spread);

    const depositAddress =
      this.configService.get<string>('blockchain.depositWalletAddress') ?? '';

    const quoteExpiresAt = new Date(Date.now() + QUOTE_TTL_MS);

    return this.orderRepository.save({
      type: input.type,
      inputToken: input.inputToken,
      outputToken: input.outputToken,
      amount: input.amount,
      userWallet: input.userWallet,
      status: OrderStatus.CREATED,
      quotePrice,
      spread,
      quoteExpiresAt,
      depositAddress,
    });
  }
}
