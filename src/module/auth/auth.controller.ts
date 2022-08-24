import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn() {
    return 'true';
  }

  @Post('signup')
  signUp(@Body() payload: SignupRequestDto) {
    console.log(payload);
    return this.authService.signUp(payload);
  }
}
