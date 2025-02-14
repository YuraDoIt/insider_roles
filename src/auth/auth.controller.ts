import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/users/enum/roles.enum';
import { Roles } from './decorator/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' }) 
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    async register(@Body() RegisterDto: RegisterDto) {
        return this.authService.register(RegisterDto);
    }


    @Post('login')
    @ApiOperation({ summary: 'Login a user' }) 
    @ApiResponse({ status: 200, description: 'User successfully logged in.' }) 
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginUserDto: LoginDto) {
        return this.authService.login(loginUserDto);
    }
}
