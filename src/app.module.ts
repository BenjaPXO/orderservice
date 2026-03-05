import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Config
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import thirdwebConfig from './config/thirdweb.config';
import blockchainConfig from './config/blockchain.config';
import redisConfig from './config/redis.config';

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
      load: [appConfig, databaseConfig, thirdwebConfig, blockchainConfig, redisConfig],
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl:
          config.get<string>('DATABASE_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        autoLoadEntities: true,
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),

    // Queue (BullMQ + Redis)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          url: config.get<string>('REDIS_URL') ?? 'redis://localhost:6379',
        },
      }),
    }),

    // Feature modules
    OrdersModule,
    BlockchainModule,
    BinanceModule,
    HealthModule,
  ],
})
export class AppModule {}
