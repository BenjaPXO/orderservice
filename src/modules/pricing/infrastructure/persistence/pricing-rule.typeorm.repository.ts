import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingRule } from '../../domain/entities/pricing-rule.entity';
import { IPricingRuleRepository } from '../../domain/repositories/pricing-rule.repository.interface';
import { PricingRuleOrmEntity } from './pricing-rule.orm-entity';

@Injectable()
export class PricingRuleTypeOrmRepository implements IPricingRuleRepository {
  constructor(
    @InjectRepository(PricingRuleOrmEntity)
    private readonly repo: Repository<PricingRuleOrmEntity>,
  ) {}

  async findByPair(pair: string): Promise<PricingRule | null> {
    const orm = await this.repo.findOne({ where: { pair } });
    if (!orm) return null;

    const rule = new PricingRule();
    rule.id = orm.id;
    rule.pair = orm.pair;
    rule.spreadBuy = orm.spreadBuy !== null ? Number(orm.spreadBuy) : 0;
    rule.spreadSell = orm.spreadSell !== null ? Number(orm.spreadSell) : 0;
    rule.updatedAt = orm.updatedAt;
    return rule;
  }
}
