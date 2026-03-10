import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingRuleOrmEntity } from './infrastructure/persistence/pricing-rule.orm-entity';
import { PricingRuleTypeOrmRepository } from './infrastructure/persistence/pricing-rule.typeorm.repository';
import { PRICING_RULE_REPOSITORY } from './domain/repositories/pricing-rule.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([PricingRuleOrmEntity])],
  providers: [
    { provide: PRICING_RULE_REPOSITORY, useClass: PricingRuleTypeOrmRepository },
  ],
  exports: [PRICING_RULE_REPOSITORY],
})
export class PricingModule {}
