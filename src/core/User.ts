import { UserRole } from '@common/enum';
import { Entity, Property, Enum } from '@mikro-orm/core';
import { ApiHideProperty } from '@nestjs/swagger';

import { BaseEntity } from './BaseEntity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  userName!: string;

  @Property()
  isActive = true;

  @Enum({ items: () => UserRole, default: UserRole.CLIENT })
  role!: UserRole;

  @Property({ hidden: true })
  password!: string;

  @Property({ hidden: true })
  @ApiHideProperty()
  hashedRefreshToken?: string;

  constructor(payload: Partial<User>) {
    super();
    Object.assign(this, payload);
  }
}
