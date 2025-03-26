import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from './env';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: env.DATABASE_URL,
  entities: ['src/entities/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  synchronize: false, // 本番環境では必ずfalse
  logging: env.NODE_ENV === 'development',
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

export const AppDataSource = new DataSource(options);

// データベース接続関数
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized');

    // pgvectorエクステンションの有効化
    await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log('pgvector extension enabled');

  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
};
