import { UserService } from '@module/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private usersService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { email, password } = req.body;
      const user = this.usersService.getAuthenticated(email, password);
      if (!user) return false;
      req.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
