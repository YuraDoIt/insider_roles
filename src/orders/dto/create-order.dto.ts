// src/orders/dto/create-order.dto.ts
import { IsArray, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entity/order.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'List of items in the order',
    type: [String], 
  })
  @IsArray()
  items: string[];

  @ApiProperty({
    description: 'Total price of the order',
    type: Number,
  })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({
    description: 'Current status of the order',
    enum: OrderStatus,  
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    description: 'ID of the user placing the order',
    type: String,
  })
  @IsString()
  userId: string;
}
