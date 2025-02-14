import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserCreateDto } from './dto/users-create.dto';
import { UpdateUserDto } from './dto/users-update.dto';
import { UserEntity } from './entity/users.entity';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { Role } from './enum/roles.enum';
import { RoleGuard } from 'src/auth/guard/role.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request, invalid input data.' })
  async create(@Body() createUserDto: UserCreateDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved users.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request, invalid input data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
