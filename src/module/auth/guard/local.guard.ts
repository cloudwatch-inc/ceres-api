import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserService } from '@module/user';
import { User } from '@core';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { email, userName, password } = req.body as User;
      const user = this.userService.getAuthenticated({
        email,
        userName,
        password,
      });
      if (!user) return false;

      req.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
