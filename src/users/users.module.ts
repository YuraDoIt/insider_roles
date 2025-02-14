import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessContorlService } from 'src/auth/guard/access-control.service';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    secret: 'yourSecretKey',  
    signOptions: { expiresIn: '60m' }, 
  }),],
  controllers: [UsersController],
  providers: [UsersService, RoleGuard, AccessContorlService],
  exports: [UsersService]
})
export class UsersModule { }
