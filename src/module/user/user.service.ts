import { User } from '@core';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(payload: CreateUserRequestDto) {
    const user = this.userRepository.create(payload);
    await this.userRepository.persistAndFlush(user);

    return user;
  }
}
