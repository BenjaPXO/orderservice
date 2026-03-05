import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';

/** Pure domain entity — no ORM decorators */
export class Order {
  id: string;
  type: OrderType;
  status: OrderStatus;
  inputToken: string;
  outputToken: string;
  amount: number;
  userWallet: string;
  txHashUser: string | null;
  txHashSettlement: string | null;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;

  isPending(): boolean {
    return (
      this.status === OrderStatus.CREATED ||
      this.status === OrderStatus.AWAITING_TRANSFER ||
      this.status === OrderStatus.FUNDS_RECEIVED ||
      this.status === OrderStatus.PROCESSING
    );
  }

  isSettled(): boolean {
    return this.status === OrderStatus.SETTLED;
  }

  isFailed(): boolean {
    return this.status === OrderStatus.FAILED;
  }
}
