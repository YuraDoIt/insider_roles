// src/orders/order.entity.ts
import { User } from 'src/users/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum OrderStatus {
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    PROCESSING = 'processing',
    PENDING = 'pending',
    NEW = 'new',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column('json')
  items: string[];

  @Column('decimal')
  totalPrice: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
