import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl:
      process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
    synchronize: false, // NUNCA true en produccion — usar migraciones
    autoLoadEntities: true,
    logging: process.env.DB_LOGGING === 'true',
    migrations: ['dist/database/migrations/*.js'],
  }),
);
