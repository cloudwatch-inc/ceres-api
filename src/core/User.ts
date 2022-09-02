import { UserRole } from '@common/enum';
import {
  Entity,
  Property,
  Enum,
  OneToOne,
  IdentifiedReference,
  Reference,
} from '@mikro-orm/core';
import { ApiHideProperty } from '@nestjs/swagger';

import { BaseEntity } from './BaseEntity';
import { Client } from './Client';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  userName!: string;

  @Property()
  isActive = true;

  @Property()
  isProfileComplete = false;

  @Enum({ items: () => UserRole, default: UserRole.CLIENT })
  role!: UserRole;

  @Property({ hidden: true })
  password!: string;

  @Property({ hidden: true })
  @ApiHideProperty()
  hashedRefreshToken?: string;

  @OneToOne({ entity: () => Client, mappedBy: 'user', wrappedReference: true })
  client: IdentifiedReference<Client>;

  getClient() {
    return this.client.load();
  }

  setClient(clientId: string) {
    this.client = Reference.createFromPK(Client, clientId);
  }

  constructor(payload: Partial<User>) {
    super();
    Object.assign(this, payload);
  }
}
