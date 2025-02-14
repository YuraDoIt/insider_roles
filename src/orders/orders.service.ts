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
        private usersRepository: Repository<UserEntity>, 
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        const { userId, items, totalPrice } = createOrderDto;

        const userIdAsNumber = Number(userId);

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

    async findAll(): Promise<OrderEntity[]> {
        return this.ordersRepository.find();
    }

    async findOne(id: number): Promise<OrderEntity> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['user'], 
        });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    async updateStatus(id: number, status: OrderStatus): Promise<OrderEntity> {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        order.status = status;
        order.updatedAt = new Date();
        return this.ordersRepository.save(order);
    }
    

    async remove(id: number): Promise<void> {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        await this.ordersRepository.remove(order);
    }
}
