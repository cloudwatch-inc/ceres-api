import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn() {
    return 'true';
  }

  @Post('signup')
  signUp(@Body() payload: SignupRequestDto) {
    return this.authService.signUp(payload);
  }
}
