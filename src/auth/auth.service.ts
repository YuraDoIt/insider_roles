// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';  // Assuming you have a UsersService to interact with users
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { username, password } = loginDto;

        // Find the user by username
        const user = await this.usersRepository.findOne({ where: { username } });

        // If no user is found, throw UnauthorizedException
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password is invalid, throw UnauthorizedException
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate the payload containing user info (username and user ID)
        const payload = { username: user.username, sub: user.id };

        // Generate a JWT token using JwtService
        const accessToken = this.jwtService.sign(payload);

        // Return the access token
        return { accessToken };
    }
}
