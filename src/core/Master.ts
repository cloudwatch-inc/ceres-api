import {
  Entity,
  Property,
  OneToOne,
  IdentifiedReference,
  Reference,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { MasterExpertise } from './MasterExpertise';

import { User } from './User';
import { BaseEntity } from './_BaseEntity';

@Entity({ tableName: 'masters' })
export class Master extends BaseEntity {
  constructor(payload: Partial<Master>) {
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
  isAvailable = true;

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

  @OneToMany(
    () => MasterExpertise,
    (masterExpertise) => masterExpertise.master,
    {
      hidden: true,
      orphanRemoval: true,
    },
  )
  masterExpertises = new Collection<MasterExpertise>(this);

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
