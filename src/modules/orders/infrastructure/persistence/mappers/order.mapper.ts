import { Order } from '../../../domain/entities/order.entity';
import { OrderStatus } from '../../../domain/enums/order-status.enum';
import { OrderType } from '../../../domain/enums/order-type.enum';
import { OrderOrmEntity } from '../order.orm-entity';

export class OrderMapper {
  static toDomain(orm: OrderOrmEntity): Order {
    const order = new Order();
    order.id = orm.id;
    order.type = orm.type as OrderType;
    order.status = orm.status as OrderStatus;
    order.inputToken = orm.inputToken;
    order.outputToken = orm.outputToken;
    order.amount = Number(orm.amount);
    order.userWallet = orm.userWallet;
    order.txHashUser = orm.txHashUser;
    order.txHashSettlement = orm.txHashSettlement;
    order.quotePrice = Number(orm.quotePrice);
    order.spread = Number(orm.spread);
    order.quoteExpiresAt = orm.quoteExpiresAt;
    order.depositAddress = orm.depositAddress;
    order.depositAmount = orm.depositAmount !== null ? Number(orm.depositAmount) : null;
    order.depositBlock = orm.depositBlock;
    order.binanceOrderId = orm.binanceOrderId;
    order.tradePrice = orm.tradePrice !== null ? Number(orm.tradePrice) : null;
    order.tradeAmount = orm.tradeAmount !== null ? Number(orm.tradeAmount) : null;
    order.feeExchange = orm.feeExchange !== null ? Number(orm.feeExchange) : null;
    order.feeSpread = orm.feeSpread !== null ? Number(orm.feeSpread) : null;
    order.feeNetwork = orm.feeNetwork !== null ? Number(orm.feeNetwork) : null;
    order.feeTotal = orm.feeTotal !== null ? Number(orm.feeTotal) : null;
    order.errorMessage = orm.errorMessage;
    order.createdAt = orm.createdAt;
    order.updatedAt = orm.updatedAt;
    return order;
  }

  static toOrm(order: Partial<Order>): Partial<OrderOrmEntity> {
    const orm = new OrderOrmEntity();
    if (order.id !== undefined) orm.id = order.id;
    if (order.type !== undefined) orm.type = order.type;
    if (order.status !== undefined) orm.status = order.status;
    if (order.inputToken !== undefined) orm.inputToken = order.inputToken;
    if (order.outputToken !== undefined) orm.outputToken = order.outputToken;
    if (order.amount !== undefined) orm.amount = order.amount;
    if (order.userWallet !== undefined) orm.userWallet = order.userWallet;
    if (order.txHashUser !== undefined) orm.txHashUser = order.txHashUser;
    if (order.txHashSettlement !== undefined) orm.txHashSettlement = order.txHashSettlement;
    if (order.quotePrice !== undefined) orm.quotePrice = order.quotePrice;
    if (order.spread !== undefined) orm.spread = order.spread;
    if (order.quoteExpiresAt !== undefined) orm.quoteExpiresAt = order.quoteExpiresAt;
    if (order.depositAddress !== undefined) orm.depositAddress = order.depositAddress;
    if (order.depositAmount !== undefined) orm.depositAmount = order.depositAmount;
    if (order.depositBlock !== undefined) orm.depositBlock = order.depositBlock;
    if (order.binanceOrderId !== undefined) orm.binanceOrderId = order.binanceOrderId;
    if (order.tradePrice !== undefined) orm.tradePrice = order.tradePrice;
    if (order.tradeAmount !== undefined) orm.tradeAmount = order.tradeAmount;
    if (order.feeExchange !== undefined) orm.feeExchange = order.feeExchange;
    if (order.feeSpread !== undefined) orm.feeSpread = order.feeSpread;
    if (order.feeNetwork !== undefined) orm.feeNetwork = order.feeNetwork;
    if (order.feeTotal !== undefined) orm.feeTotal = order.feeTotal;
    if (order.errorMessage !== undefined) orm.errorMessage = order.errorMessage;
    return orm;
  }
}
