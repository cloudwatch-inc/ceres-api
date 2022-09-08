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

  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(200)
  @Post('signin')
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

  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(200)
  @Post('signup')
  async signup(
    @Body() payload: SignupRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<User> {
    const res = await this.authService.signupAndAuthenticate(payload);
    reply.header('Set-Cookie', [res.accessCookie, res.refreshCookie]);

    return res.user;
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
