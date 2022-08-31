import { Cascade, Entity, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity({ tableName: 'clients' })
export class Client extends BaseEntity {
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
  state!: string;

  @Property({ length: 40 })
  zip!: string;

  @Property({ length: 40 })
  country!: string;

  @Property()
  photo?: string;

  @Property()
  coverPhoto?: string;

  @OneToOne({ cascade: [Cascade.ALL], owner: true })
  user?: User;

  @Property({ persist: false })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(payload: Partial<Client>) {
    super();
    Object.assign(this, payload);
  }
}
