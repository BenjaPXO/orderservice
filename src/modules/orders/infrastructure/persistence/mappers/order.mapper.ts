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
    if (order.errorMessage !== undefined) orm.errorMessage = order.errorMessage;
    return orm;
  }
}
