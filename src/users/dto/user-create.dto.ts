// src/auth/dto/register.dto.ts
import { IsString, IsEnum } from 'class-validator';
import { Role } from '../enum/roles.enum';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
