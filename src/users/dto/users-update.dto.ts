// src/auth/dto/update-user.dto.ts
import { IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Role } from '../enum/roles.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional() // This field is optional when updating the user
  @MinLength(4, { message: 'Username is too short, minimum length is 4 characters.' })
  @MaxLength(20, { message: 'Username is too long, maximum length is 20 characters.' })
  username?: string;

  @IsString()
  @IsOptional() // This field is optional when updating the user
  @MinLength(6, { message: 'Password is too short, minimum length is 6 characters.' })
  @MaxLength(20, { message: 'Password is too long, maximum length is 20 characters.' })
  password?: string;  // Optional field for updating the password

  @IsEnum(Role)
  @IsOptional() // Role is optional if it is not being changed
  role?: Role;
}
