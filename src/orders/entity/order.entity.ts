// src/orders/order.entity.ts
import { UserEntity } from 'src/users/entity/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum OrderStatus {
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    PROCESSING = 'processing',
    PENDING = 'pending',
    NEW = 'new',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity;

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
