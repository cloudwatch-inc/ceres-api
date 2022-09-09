import {
  Entity,
  IdentifiedReference,
  OneToOne,
  Property,
  Reference,
} from '@mikro-orm/core';

import { User } from './User';
import { BaseEntity } from './_BaseEntity';

@Entity({ tableName: 'clients' })
export class Client extends BaseEntity {
  constructor(payload: Partial<Client>) {
    super();
    Object.assign(this, payload);
  }

  @Property({ length: 40 })
  firstName!: string;

  @Property({ length: 40 })
  middleName?: string;

  @Property({ length: 40 })
  lastName!: string;

  @Property({ columnType: 'smallint' })
  age!: number;

  @Property({ columnType: 'date' })
  bod!: Date;

  @Property()
  photo?: string;

  @Property()
  coverPhoto?: string;

  @OneToOne({
    entity: () => User,
    inversedBy: 'client',
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

  @Property({ persist: false })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
