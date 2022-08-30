import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { User } from '@core';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator';
import { SigninRequestDto, SignupRequestDto } from './dto';
import { JwtAuthGuard, LocalGuard } from './guard';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(LocalGuard)
  async signin(
    @CurrentUser() user: User,
    @Body() payload: SigninRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User> {
    const res = await this.authService.signin(user);

    reply.header('Set-Cookie', [res.accessCookie, res.refreshCookie]);
    return reply.send(user);
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

  @HttpCode(204)
  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<void> {
    const logOutCookies = await this.authService.getCookiesForLogOut(user.id);
    reply.header('Set-Cookie', logOutCookies);

    return reply.redirect('/test');
  }
}
