import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    async getHello() {
        return "hello"
    }
}
