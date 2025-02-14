import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity]), JwtModule.register({
      secret: 'yourSecretKey',  
      signOptions: { expiresIn: '60m' },  
    }),],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
