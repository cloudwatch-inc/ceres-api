import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Client, User } from '@core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbException } from '@common/exception';
import { CreateClientRequestDto } from './dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: EntityRepository<Client>,
    private readonly em: EntityManager,
  ) {}

  async findByUserId(userId: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      user: { id: userId },
    });
    if (!Boolean(client)) {
      throw new NotFoundException();
    }
    return client;
  }

  async create(
    userId: string,
    payload: CreateClientRequestDto,
  ): Promise<Client> {
    const isUserIdExists = await this.findByUserId(userId);

    if (Boolean(isUserIdExists)) {
      throw new ConflictException('User already has a client');
    }

    try {
      const client = new Client(payload);
      client.user = this.em.getReference(User, userId);
      await this.clientRepository.persistAndFlush(client);
      return client;
    } catch (e) {
      throw new DbException(e);
    }
  }
}
