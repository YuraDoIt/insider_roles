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
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (!user) {
      return false; 
    }


    for (let role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: user.role, 
      });

      if (result) {
        return true; 
      }
    }

    return false;
  }
}
