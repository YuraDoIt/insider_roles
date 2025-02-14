import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders/entity/order.entity';
import { UserEntity } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrdersModule, UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_host,
    port: process.env.DB_port ? + process.env.DB_port : 5433,
    username: 'postgres',
    password: '12345',
    database: 'roles',
    entities: [UserEntity, OrderEntity],
    synchronize: true,
    migrationsRun: true,
    logging: true,
  })],
})
export class AppModule { }
