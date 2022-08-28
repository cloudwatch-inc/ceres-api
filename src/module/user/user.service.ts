import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';

import { DbException, InvalidCredentialsException } from '@common/exception';
import { User } from '@core';
import { CreateUserRequestDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(payload: CreateUserRequestDto): Promise<User> {
    const isUsernameAndEmailExists = await this.userRepository.count({
      $or: [{ userName: payload.userName }, { email: payload.email }],
    });

    if (isUsernameAndEmailExists) {
      throw new DbException(HttpStatus.CONFLICT);
    }

    try {
      const user = new User(payload);
      await this.userRepository.persistAndFlush(user);
      return user;
    } catch (e) {
      throw new DbException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.em.findOne(User, { email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async saveRefreshToken(refreshToken: string, id: number): Promise<void> {
    const hashedRefreshToken = await argon.hash(refreshToken);
    const user = await this.userRepository.findOne(id);
    user.hashedRefreshToken = hashedRefreshToken;

    await this.userRepository.persistAndFlush(user);
  }

  async removeRefreshToken(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    user.hashedRefreshToken = null;

    await this.userRepository.persistAndFlush(user);
  }

  async getAuthenticated(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    const isRightPassword = await argon.verify(user.password, password);
    if (!isRightPassword) {
      throw new InvalidCredentialsException();
    }
    return user;
  }
}
