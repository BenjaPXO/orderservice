import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BullModule } from '@nestjs/bullmq'; // TODO: re-enable when Redis is ready
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Config
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import thirdwebConfig from './config/thirdweb.config';
import blockchainConfig from './config/blockchain.config';
import redisConfig from './config/redis.config';
import binanceConfig from './config/binance.config';

// Modules
import { OrdersModule } from './modules/orders/orders.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { BinanceModule } from './modules/binance/binance.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Config global
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, thirdwebConfig, blockchainConfig, redisConfig, binanceConfig],
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions =>
        config.get<TypeOrmModuleOptions>('database') as TypeOrmModuleOptions,
    }),

    // Queue (BullMQ + Redis) — TODO: re-enable when Redis is ready
    // BullModule.forRootAsync({ ... }),

    // Feature modules
    OrdersModule,
    BlockchainModule,
    BinanceModule,
    HealthModule,
  ],
})
export class AppModule {}
