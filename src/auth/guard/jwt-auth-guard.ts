import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/users/entity/users.entity';
import { env } from 'process';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@InjectRepository(UserEntity) private user: Repository<UserEntity>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers['authorization'];

        if (!authorization) {
            throw new UnauthorizedException('No access token provided');
        }

        const validAccessToken = authorization.split(' ')[1];
        if (!validAccessToken) {
            throw new UnauthorizedException('Invalid access token');
        }
        console.log(validAccessToken)
        try {
            const decodedPayload = <jwt.JwtPayload>jwt.verify(validAccessToken, 'yourSecretKey');

            const curUserFromDB = await this.user.findOne({ where: { username: decodedPayload.username } });

            if (!curUserFromDB) {
                throw new UnauthorizedException('User not found');
            }

            if (curUserFromDB.username !== decodedPayload.username) {
                throw new UnauthorizedException('Invalid user');
            }

            request.user = curUserFromDB;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
