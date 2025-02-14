// src/auth/auth.service.ts
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; 
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './jwt/jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { username, password } = loginDto;

        const user = await this.usersRepository.findOne({ where: { username } });
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }


    async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
        const { username, password, role } = registerDto;

        const existingUser = await this.usersRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.usersRepository.create({
            username,
            password: hashedPassword,
            role,  
        });

        await this.usersRepository.save(newUser);

        const payload: JwtPayload = { username: newUser.username, sub: newUser.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
