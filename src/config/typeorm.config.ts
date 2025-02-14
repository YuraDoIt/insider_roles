import * as dotenv from 'dotenv';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { UserEntity } from 'src/users/entity/users.entity';
dotenv.config();
import { DataSourceOptions  } from 'typeorm';

const config: DataSourceOptions  = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5433,
  username: `${process.env.TYPEORM_USERNAME}`,
  password: `${process.env.TYPEORM_PASSWORD}`,
  database: `${process.env.TYPEORM_DATABASE}`,
  entities: [UserEntity, OrderEntity],
  synchronize: true,
  logging: true,
};

export default config;
