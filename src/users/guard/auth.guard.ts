// src/auth/guards/roles.guard.ts
import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    if (requiredRoles.includes(user.role)) {
      return true;
    }
    throw new ForbiddenException('You do not have permission to access this resource');
  }
}
