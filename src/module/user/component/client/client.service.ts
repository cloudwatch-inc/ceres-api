import { CreateAddressRequestDto } from './../../dto/create-address.request.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ConflictException, Injectable } from '@nestjs/common';

import { Address, Client, User } from '@core';
import { DbException } from '@common/exception';
import { CreateClientRequestDto } from './dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: EntityRepository<Client>,
    @InjectRepository(Address)
    private readonly addressRepository: EntityRepository<Address>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async findByUserId(userId: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      user: { id: userId },
    });

    return client;
  }

  async create(userId: string, payload: CreateClientRequestDto): Promise<User> {
    const isUserIdExists = await this.findByUserId(userId);

    if (Boolean(isUserIdExists)) {
      throw new ConflictException('User already has a client');
    }

    try {
      const client = new Client(payload);
      client.setUser(userId);
      await this.em.persistAndFlush(client);

      const address = await this.createAddress(payload.address, userId);
      const user = await client.getUser();
      user.setAddress(address.id);

      await this.em.persistAndFlush(user);

      delete client.user;
      delete address.user;
      return user;
    } catch (e) {
      throw e;
    }
  }

  async createAddress(payload: CreateAddressRequestDto, userId: string) {
    try {
      const address = new Address(payload);
      address.setUser(userId);

      await this.addressRepository.persistAndFlush(address);

      return address;
    } catch (e) {
      throw e;
    }
  }
}
