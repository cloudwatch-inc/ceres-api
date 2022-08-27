import { wrap } from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { User } from '@core';
import { UserService } from '@module/user/user.service';
import { SignupRequestDto } from './dto';
import { Environment } from '@common/config';
import { ISignupResponse } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {}

  async signin(user: User): Promise<any> {
    const accessCookie = await this.getAccessCookie(user);
    const refreshCookie = await this.getRefreshCookie(user.id);

    return { user, accessCookie, refreshCookie };
  }

  async signupAndAuthenticate(
    payload: SignupRequestDto,
  ): Promise<ISignupResponse> {
    const user = await this.userService.create({
      ...payload,
      password: await argon.hash(payload.password),
    });

    const accessCookie = await this.getAccessCookie(user);
    const refreshCookie = await this.getRefreshCookie(user.id);

    return { user, accessCookie, refreshCookie };
  }

  async getCookiesForLogOut(userId: string): Promise<string[]> {
    await this.usersService.removeRefreshToken(userId);
    const sameSiteSecure =
      this.configService.get('NODE_ENV') === Environment.Production
        ? 'SameSite=None; Secure'
        : '';
    return [
      `Authentication=; Path=/; Max-Age=0; ${sameSiteSecure}`,
      `Refresh=; Path=/; Max-Age=0; ${sameSiteSecure}`,
    ];
  }

  async getAccessCookie(user: User): Promise<string> {
    const tokenPayload = wrap(user).toObject();
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}; ${
      this.configService.get('NODE_ENV') === Environment.Production
        ? 'SameSite=None; Secure'
        : ''
    }`;
  }

  async getRefreshCookie(userId: string): Promise<string> {
    const payload = { id: userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    await this.usersService.saveRefreshToken(refreshToken, userId);

    return `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}; ${
      this.configService.get('NODE_ENV') === Environment.Production
        ? 'SameSite=None; Secure'
        : ''
    }`;
  }

  verifyAccessToken(token: string): User & { iat: string; exp: string } {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async verifyRefreshToken(token: string): Promise<User> {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
    const user = await this.usersService.findById(payload.id);
    if (!user.hashed_refresh_token) {
      throw new BadRequestException('refresh_token_not_found');
    }
    const isRefreshTokenMatching = await argon.verify(
      user.hashed_refresh_token,
      token,
    );
    if (!isRefreshTokenMatching) throw new BadRequestException();
    return user;
  }
}
