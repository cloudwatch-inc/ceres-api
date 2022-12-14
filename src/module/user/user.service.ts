import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';

import { DbException, InvalidCredentialsException } from '@common/exception';
import { User } from '@core';
import { CreateUserRequestDto } from './dto';
import { IUserAuthenticate } from './interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll({
      filters: ['isActive'],
    });
  }

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
    const user = await this.em.findOne(
      User,
      { email },
      { populate: ['client', 'address'] },
    );
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findByUserName(userName: string): Promise<User> {
    const user = await this.em.findOne(
      User,
      { userName },
      { populate: ['client'] },
    );
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      populate: ['client'],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteOneById(id: string): Promise<void> {
    // hard delete
    // const user = await this.userRepository.findOneOrFail(id, ['leaves']);
    // this.userRepository.removeAndFlush(user);

    //soft delete
    const user = await this.userRepository.findOneOrFail(id);
    user.deletedAt = new Date();
    this.userRepository.flush();
  }

  async restore(id: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    user.deletedAt = undefined;
    this.userRepository.flush();
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

  async getAuthenticated(payload: IUserAuthenticate): Promise<User> {
    const { email, password, userName } = payload;
    const user = email
      ? await this.findByEmail(email)
      : await this.findByUserName(userName);

    const isRightPassword = await argon.verify(user.password, password);
    if (!isRightPassword) {
      throw new InvalidCredentialsException();
    }
    return user;
  }
}
