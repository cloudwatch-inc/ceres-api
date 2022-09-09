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

import { BaseEntity } from './_BaseEntity';
import { Client } from './Client';
import { Master } from './Master';
import { Address } from './Address';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  constructor(payload?: Partial<User>) {
    super();
    Object.assign(this, payload);
  }

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

  @Property()
  phone!: string;

  @Property()
  phoneRegionCode?: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ hidden: true })
  @ApiHideProperty()
  hashedRefreshToken?: string;

  @OneToOne({ entity: () => Client, mappedBy: 'user', wrappedReference: true })
  client?: IdentifiedReference<Client>;

  getClient() {
    return this.client.load();
  }

  setClient(clientId: string) {
    this.client = Reference.createFromPK(Client, clientId);
  }

  @OneToOne({
    entity: () => Master,
    mappedBy: 'user',
    wrappedReference: true,
    hidden: true,
  })
  master?: IdentifiedReference<Master>;

  getMaster() {
    return this.master.load();
  }

  setMaster(masterId: string) {
    this.master = Reference.createFromPK(Master, masterId);
  }

  @OneToOne({ entity: () => Address, mappedBy: 'user', wrappedReference: true })
  address?: IdentifiedReference<Address>;

  getAddress() {
    return this.address.load();
  }

  setAddress(addressId: string) {
    this.address = Reference.createFromPK(Address, addressId);
  }
}
