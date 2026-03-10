import { PricingRule } from '../entities/pricing-rule.entity';

export const PRICING_RULE_REPOSITORY = Symbol('PRICING_RULE_REPOSITORY');

export interface IPricingRuleRepository {
  findByPair(pair: string): Promise<PricingRule | null>;
}
