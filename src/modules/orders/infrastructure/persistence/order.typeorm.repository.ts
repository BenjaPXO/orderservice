import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { OrderOrmEntity } from './order.orm-entity';
import { OrderMapper } from './mappers/order.mapper';

@Injectable()
export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repo: Repository<OrderOrmEntity>,
  ) {}

  async findById(id: string): Promise<Order | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? OrderMapper.toDomain(orm) : null;
  }

  async save(order: Partial<Order>): Promise<Order> {
    const orm = this.repo.create(OrderMapper.toOrm(order) as OrderOrmEntity);
    const saved = await this.repo.save(orm);
    return OrderMapper.toDomain(saved);
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    extra?: Partial<Order>,
  ): Promise<void> {
    await this.repo.update(id, {
      status,
      ...(extra ? OrderMapper.toOrm(extra) : {}),
    });
  }

  async findExpiredOrders(): Promise<Order[]> {
    const cutoff = new Date(Date.now() - 30 * 60 * 1000);
    const orms = await this.repo.find({
      where: { status: OrderStatus.CREATED, createdAt: LessThan(cutoff) },
    });
    return orms.map(OrderMapper.toDomain);
  }
}
