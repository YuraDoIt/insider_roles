import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from 'src/users/decorator/roles.decorator';
import { Role } from 'src/users/enum/roles.enum';
// import { RolesGuard } from 'src/users/guard/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entity/order.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
// import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';

@ApiTags('orders') 
@ApiBearerAuth() 
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Roles(Role.USER, Role.ADMIN)
  @ApiBearerAuth()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved orders.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @Roles(Role.USER, Role.ADMIN)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid order status.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiBearerAuth()
  async updateStatus(@Param('id') id: number, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
