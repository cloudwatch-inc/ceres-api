import { UserService } from '@module/user/user.service';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { SignupRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn() {
    return true;
  }

  async signUp(payload: SignupRequestDto) {
    const hash = await argon.hash(payload.password);

    const user = await this.userService.create({
      ...payload,
      password: hash,
    });

    return user;
  }
}
