import * as dotenv from 'dotenv';
dotenv.config();
import { DataSourceOptions  } from 'typeorm';

const config: DataSourceOptions  = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5433,
  username: `${process.env.TYPEORM_USERNAME}`,
  password: `${process.env.TYPEORM_PASSWORD}`,
  database: `${process.env.TYPEORM_DATABASE}`,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: true,
};

export default config;
