import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { AccessContorlService } from 'src/auth/guard/access-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity]), JwtModule.register({
      secret: 'yourSecretKey',  
      signOptions: { expiresIn: '60m' },  
    }),],
  providers: [OrdersService, RoleGuard, AccessContorlService],
  controllers: [OrdersController]
})
export class OrdersModule {}
