import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { User } from '@core';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator';
import { SignupRequestDto } from './dto';
import { JwtAuthGuard, LocalGuard } from './guard';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin() {
    return 'true';
  }

  @Post('signup')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signup(
    @Body() payload: SignupRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User> {
    const res = await this.authService.signupAndAuthenticate(payload);

    reply.header('Set-Cookie', [res.accessCookie, res.refreshCookie]);
    return reply.send(res.user);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<void> {
    console.log({ user });
    const logOutCookies = await this.authService.getCookiesForLogOut(user.id);
    reply.header('Set-Cookie', logOutCookies);
  }
}
