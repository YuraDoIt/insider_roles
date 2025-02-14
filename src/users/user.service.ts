// src/users/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/users.entity';
import { Role } from './enum/roles.enum';
import { UserCreateDto } from './dto/users-create.dto';
import { UpdateUserDto } from './dto/users-update.dto';
import * as bcrypt from 'bcrypt';  // Для хешування паролів

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Create a new user
  async create(UserCreateDto: UserCreateDto): Promise<UserEntity> {
    const { username, password, role } = UserCreateDto;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      role: role || Role.USER,  // Default to USER if no role is provided
    });

    return await this.userRepository.save(newUser);
  }

  // Get user by ID
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get all users
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // Update user details
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);

    if (updateUserDto.password) {
      // If password is being updated, hash it before saving
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  // Delete user by ID
  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }
}
