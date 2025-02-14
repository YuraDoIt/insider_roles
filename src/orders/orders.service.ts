// src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: Repository<OrderEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>, // We inject the User repository to work with user data if needed
    ) { }

    // Create a new order
    async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        const { userId, items, totalPrice } = createOrderDto;

        const userIdAsNumber = Number(userId);  // Convert the userId to a number

        const user = await this.usersRepository.findOne({ where: { id: userIdAsNumber } });
        if (!user) {
            throw new NotFoundException('User not found');
        }


        const order = new OrderEntity();
        order.user = user;
        order.items = items;
        order.totalPrice = totalPrice;
        order.status = OrderStatus.NEW;
        order.createdAt = new Date();
        order.updatedAt = new Date();

        return this.ordersRepository.save(order);
    }

    // Find all orders
    async findAll(): Promise<OrderEntity[]> {
        return this.ordersRepository.find();
    }

    // Find a specific order by ID
    async findOne(id: number): Promise<OrderEntity> {
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
    async updateStatus(id: number, status: OrderStatus): Promise<OrderEntity> {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        order.status = status;
        order.updatedAt = new Date();
        return this.ordersRepository.save(order);
    }

    // Admin can delete
    async remove(id: number): Promise<void> {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        await this.ordersRepository.remove(order);
    }
}
