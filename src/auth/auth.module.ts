import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { AccessContorlService } from './guard/access-control.service';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'yourSecretKey',
    signOptions: { expiresIn: '60m' },
  }),
    TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, AccessContorlService],
  controllers: [AuthController]
})
export class AuthModule { }
