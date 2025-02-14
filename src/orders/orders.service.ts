// src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entity/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>, // We inject the User repository to work with user data if needed
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items, totalPrice } = createOrderDto;

    // Find user who is creating the order
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Order();
    order.user = user;
    order.items = items;
    order.totalPrice = totalPrice;
    order.status = OrderStatus.NEW;
    order.createdAt = new Date();
    order.updatedAt = new Date();

    return this.ordersRepository.save(order);
  }

  // Find all orders
  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  // Find a specific order by ID
  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user'], // Include user in the result to get user data if needed
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Update the status of an order (only for Admin)
  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    order.updatedAt = new Date();
    return this.ordersRepository.save(order);
  }

  // Remove an order (only the user who created the order or Admin can delete)
  async remove(id: number): Promise<void> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.ordersRepository.remove(order);
  }
}
