// role.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/enum/roles.enum';
import { AccessContorlService } from './access-control.service';
import { ROLE_KEY } from '../decorator/roles.decorator';

export class TokenDto {
  id: number;
  role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessContorlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the required roles from the metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Access the user object set by JwtAuthGuard

    if (!user) {
      return false; // If there's no user, deny access
    }

    // Check if the user's role matches any of the required roles
    for (let role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: user.role, // Access the role from request.user
      });

      if (result) {
        return true; // If the user has the required role, allow access
      }
    }

    return false; // If no match, deny access
  }
}
