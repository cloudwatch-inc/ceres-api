import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { SignupRequestDto } from './dto';
@Injectable()
export class AuthService {
  async signIn() {
    return true;
  }

  async signUp(payload: SignupRequestDto) {
    const hash = await argon.hash(payload.password);

    return false;
  }
}
