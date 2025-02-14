import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/users/enum/roles.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entity/order.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.USER, Role.ADMIN)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved orders.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid order status.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async updateStatus(@Param('id') id: number, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
