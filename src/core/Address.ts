import {
  Entity,
  IdentifiedReference,
  OneToOne,
  Property,
  Reference,
} from '@mikro-orm/core';
import { User } from './User';

import { BaseEntity } from './_BaseEntity';

@Entity({ tableName: 'address' })
export class Address extends BaseEntity {
  @Property({ length: 40 })
  address_unit?: string;

  @Property({ length: 60 })
  address_street?: string;

  @Property({ length: 60 })
  address1!: string;

  @Property({ length: 60 })
  address2?: string;

  @Property({ length: 40 })
  suburb?: string;

  @Property({ length: 40 })
  city!: string;

  @Property({ length: 40 })
  state!: string;

  @Property({ length: 40 })
  zip!: string;

  @Property({ length: 40 })
  country!: string;

  @OneToOne({
    entity: () => User,
    inversedBy: 'address',
    owner: true,
    wrappedReference: true,
  })
  user!: IdentifiedReference<User>;

  async getUser() {
    const user = await this.user.load();
    return user;
  }

  setUser(userId: string) {
    this.user = Reference.createFromPK(User, userId);
  }

  constructor(payload: Partial<Address>) {
    super();
    Object.assign(this, payload);
  }
}
