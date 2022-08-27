import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      console.log({ context });
      const token = req.cookies['Authentication'];
      if (!token) return false;

      const payload = this.authService.verifyAccessToken(token);
      delete payload.iat;
      delete payload.exp;
      req.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
