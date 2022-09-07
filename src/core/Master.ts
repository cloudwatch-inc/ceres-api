import {
  Entity,
  Property,
  OneToOne,
  IdentifiedReference,
  Reference,
} from '@mikro-orm/core';

import { User } from './User';
import { BaseEntity } from './_BaseEntity';

@Entity({ tableName: 'masters' })
export class Master extends BaseEntity {
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
    inversedBy: 'master',
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

  constructor(payload: Partial<Master>) {
    super();
    Object.assign(this, payload);
  }
}
