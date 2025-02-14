import { IsString, IsEnum, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/users/enum/roles.enum';

export class RegisterDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'user_yura', 
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Username is too short, minimum length is 4 characters.' })
  @MaxLength(20, { message: 'Username is too long, maximum length is 20 characters.' })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Coffee@Rains_202', 
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short, minimum length is 6 characters.' })
  @MaxLength(20, { message: 'Password is too long, maximum length is 20 characters.' })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    example: Role.USER, 
  })
  @IsEnum(Role)
  role: Role;
}
