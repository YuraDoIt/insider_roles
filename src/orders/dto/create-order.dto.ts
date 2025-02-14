// src/orders/dto/create-order.dto.ts
import { IsArray, IsNumber, IsString, IsEnum } from 'class-validator';
import { OrderStatus } from '../entity/order.entity';

export class CreateOrderDto {
  @IsArray()
  items: string[]; 

  @IsNumber()
  totalPrice: number; 

  @IsEnum(OrderStatus)
  status: OrderStatus; 

  @IsString()
  userId: string;  
}
