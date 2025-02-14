import ormconfig from './config/typeorm.config';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrdersModule, UsersModule, AuthModule, TypeOrmModule.forRoot(ormconfig)],
})
export class AppModule { }
