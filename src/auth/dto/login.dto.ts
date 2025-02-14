import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user attempting to log in',
    example: 'user_yura',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password associated with the username',
    example: 'Coffee@Rains_202',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
