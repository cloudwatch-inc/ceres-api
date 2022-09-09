import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { User } from '@core';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator';
import { SigninRequestDto, SignupRequestDto } from './dto';
import { JwtAuthGuard, JwtRefreshTokenGuard, LocalGuard } from './guard';
import { ResponseTransformInterceptor } from '@common/interceptor';

@ApiTags('auth')
@Controller({ path: 'auth', version: 'v1' })
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(LocalGuard)
  async signin(
    @CurrentUser() user: User,
    @Body() payload: SigninRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User> {
    const res = await this.authService.signin(user);
    reply.header('Set-Cookie', [res.accessCookie, res.refreshCookie]);

    return user;
  }

  @Post('signup')
  @HttpCode(200)
  @ApiConsumes('application/x-www-form-urlencoded')
  async signup(
    @Body() payload: SignupRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User> {
    const res = await this.authService.signupAndAuthenticate(payload);
    reply.header('Set-Cookie', [res.accessCookie, res.refreshCookie]);

    return res.user;
  }

  @Post('signout')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async signout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<void> {
    const logOutCookies = await this.authService.getCookiesForLogOut(user.id);
    reply.header('Set-Cookie', logOutCookies);
  }

  @Get('refresh-token')
  @UseGuards(JwtRefreshTokenGuard)
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User> {
    const accessCookie = await this.authService.getAccessCookie(user);
    reply.header('Set-Cookie', accessCookie);

    return user;
  }
}
