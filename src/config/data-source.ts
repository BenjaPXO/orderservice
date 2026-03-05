import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// DataSource para CLI de migraciones (fuera del contexto de NestJS)
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.orm-entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
